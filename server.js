const express = require('express');
const bodyParser = require('body-parser');
const {
  graphqlExpress,
  graphiqlExpress
} = require('apollo-server-express');
const {
  makeExecutableSchema
} = require('graphql-tools');
const chalk = require('chalk');

const users = [{
  id: '1',
  name: 'alex',
  username: 'aspieslechner',
  password: 'asdf1234',
  email: 'aspieslechner@gmail.com',
  roles: ['1'],
}];

const roles = [{
    id: '1',
    title: 'admin',
    permissions: ['1', '2'],
  },
  {
    id: '2',
    title: 'moderator',
    permissions: ['1'],
  }
];

const permissions = [{
  id: '1',
  title: 'users:read',
}, {
  id: '2',
  title: 'users:write',
}];

const typeDefs = `
  type Query  {
    users: [User]
    user(id: ID!): User
    roles: [Role]
    role(id: ID!): Role
    permissions: [Permission]
    permission(id: ID!): Permission
  }
  type User {
    id: ID!
    name: String
    username: String!
    password: String!
    email: String
    roles: [Role]
  }
  type Role {
    id: ID!
    title: String
    permissions: [Permission]
  }
  type Permission {
    id: ID!
    title: String
  }
`;

// The resolvers
const resolvers = {
  Query: {
    users: (obj, args, context, info) => {
      return users;
    },
    user: (obj, args, context, info) => {
      return users.find(obj => {
        return obj.id === args.id;
      });
    },
  },
  User: {
    roles(user) {
      return user.roles.map(roleID => {
        return roles.find(role => {
          return role.id === roleID;
        });
      });
    }
  },
  Role: {
    permissions(role) {
      return role.permissions.map(permissionID => {
        return permissions.find(permission => {
          return permission.id === permissionID;
        });
      });
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// MongoDB Connection
// const db = require('./db');

// Init Server
const app = express();

// GraphQL Endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
  schema,
  context: {
    value: 'test',
  },
})));

// GraphiQL
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.listen(4000, () => {
  console.clear();
  console.log(chalk.green(`Server is running on port 4000`));
});