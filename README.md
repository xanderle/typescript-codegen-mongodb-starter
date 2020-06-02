# GraphQL Code Generation

Small example of how to use GraphQL schema to generate Typescript interfaces for MongoDB, Resolvers and Schema

Advantage: GraphQL schema is the only source of truth, no need for doubling up on schema definitions

This is an attempt at implementing [this](https://medium.com/better-programming/how-to-integrate-an-apollo-graphql-server-with-mongodb-and-typescript-code-generator-b029d821591) without webpack

I encountered a whole bunch of problems trying to import .graphql files into typescript. Just declaring it inside a ts file works though
