import {resolvers} from "./graphql/resolvers";

require('dotenv').config()


// import { environment } from "./environment";
import schema from './graphql/schema'

const { ApolloServer } = require("apollo-server-express");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';

import { MongoClient } from "mongodb";



// defining the Express index
const app = express();
const server = new ApolloServer({
    typeDefs: [DIRECTIVES,schema],
    resolvers,
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

// add main router
// app.use("/api", BaseRouter);
// starting the server


MongoClient.connect('mongodb://localhost:27017/animals').then(
    client => {
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        app.listen(3000, async ()  => {
            console.log(`listening on port 3000${server.graphqlPath}`);

        });
    }
)

