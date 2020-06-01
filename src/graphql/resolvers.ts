import { Resolvers } from '../types';

const USER = {
    id: 123,
    firstName: "hello",
    lastName: "world",

}
export const resolvers: Resolvers = {
    Query: {
        user: (parents, args) => {
            return USER;

        }
    }
}