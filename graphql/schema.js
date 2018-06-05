import {
  makeExecutableSchema
} from 'graphql-tools';

import User from './user.schema';

const RootQuery = `
  type RootQuery {
    user(id: ID!): User
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, User],
  resolvers: {},
});