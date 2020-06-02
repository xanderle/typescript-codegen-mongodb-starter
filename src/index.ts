import {resolvers} from "./graphql/resolvers";
import {DateTimeMock, EmailAddressMock } from 'graphql-scalars';

require('dotenv').config()

const { ApolloServer } = require("apollo-server-express");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import {environment} from "./environment";
import {addMockUsersAsync, mongoDbProvider} from "./database";
import typeDefs from "./graphql/typeDefs";



// defining the Express index
const app = express();
const server = new ApolloServer({
    typeDefs: [DIRECTIVES,typeDefs],
    resolvers,
    introspection: environment.apollo.introspection,
    mockEntireSchema: false,
    mocks: {
        DateTime: DateTimeMock,
        EmailAddress: EmailAddressMock,
    },
    playground: environment.apollo.playground,
});

// adding in apollo middleware
server.applyMiddleware({ app });

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// adding compression to make things fast
app.use(compression());


(async function bootstrapAsync(): Promise<void> {
    await mongoDbProvider.connectAsync(environment.mongoDb.databaseName);
    await addMockUsersAsync(); // TODO: Remove in PROD.
        app.listen(environment.port, async ()  => {
            console.log(`listening on port ${environment.port} ${server.graphqlPath}`);
        });


})();
