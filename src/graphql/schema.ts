import { makeExecutableSchema } from '@graphql-tools/schema';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';

const { gql } = require('apollo-server');


export default gql`
    type User @entity {
    id: Int! @id
    firstName: String! @column
    lastName: String! @column

    }

    type Query @entity {
    user: User @link
    }

    schema {
    query: Query
    }
`;