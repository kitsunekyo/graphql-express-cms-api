import Role from './role.schema';

const User = `
  type User {
    id: ID!
    name: String
    username: String
    roles: [Role]
  }
`;
export default () => [User];