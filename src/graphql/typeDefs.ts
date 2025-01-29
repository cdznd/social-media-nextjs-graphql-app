import { gql } from "graphql-tag";
  
const typeDefs = gql`
  # User Model
  type User {
    id: ID!
    name: String
    email: String
    emailVerified: String
    image: String
    createdAt: String
    updatedAt: String
    posts: [Post!]!
    accounts: [Account!]!
    sessions: [Session!]!
  }

  # Post Model
  type Post {
    id: ID!
    title: String!
    content: String
    published: Boolean!
    createdAt: String!
    updatedAt: String!
    author: User
  }

  # Account Model
  type Account {
    id: ID!
    providerType: String!
    providerId: String!
    providerAccountId: String!
    refreshToken: String
    accessToken: String
    accessTokenExpires: String
    createdAt: String!
    updatedAt: String!
    user: User!
  }

  # Session Model
  type Session {
    id: ID!
    sessionToken: String!
    accessToken: String!
    expires: String!
    createdAt: String!
    updatedAt: String!
    user: User!
  }

  # VerificationRequest Model
  type VerificationRequest {
    id: ID!
    identifier: String!
    token: String!
    expires: String!
    createdAt: String!
    updatedAt: String!
  }

  # Queries
  type Query {
    users: [User!]!
    user(id: String!): User
    posts: [Post!]!
    post(id: ID!): Post
    sessions: [Session!]!
    session(id: String!): Session
    verificationRequests: [VerificationRequest!]!
    verificationRequest(id: String!): VerificationRequest
  }

  # Mutations
  type Mutation {
    createUser(name: String, email: String): User!
    createPost(title: String!, content: String, authorId: String): Post!
    updatePost(id: ID!, title: String, content: String, published: Boolean): Post
    deletePost(id: ID!): Post
  }
`;

export default typeDefs;
