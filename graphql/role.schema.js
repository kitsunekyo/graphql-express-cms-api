import Permission from './permission.schema';

const Role = `
  type Role {
    id: ID!
    name: String
    permissions: [Permission]
  }
`;

export default () => [Role];