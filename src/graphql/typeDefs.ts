import { gql } from 'graphql-tag';

const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    name: String
    email: String!
    emailVerified: DateTime
    image: String
    accounts: [Account!]!
    sessions: [Session!]!
    authenticators: [Authenticator!]!
    posts: [Post!]!
    likes: [Like!]!
    comments: [Comment!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Account {
    userId: String!
    type: String!
    provider: String!
    providerAccountId: String!
    refresh_token: String
    access_token: String
    expires_at: Int
    token_type: String
    scope: String
    id_token: String
    session_state: String
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
  }

  type Session {
    sessionToken: String!
    userId: String!
    expires: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
  }

  type VerificationToken {
    identifier: String!
    token: String!
    expires: DateTime!
  }

  type Authenticator {
    credentialID: String!
    userId: String!
    providerAccountId: String!
    credentialPublicKey: String!
    counter: Int!
    credentialDeviceType: String!
    credentialBackedUp: Boolean!
    transports: String
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    thumbnail: String
    authorId: String!
    author: User!
    likes: [Like!]!
    comments: [Comment!]!
    categories: [Category!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Category {
    id: ID!
    name: String!
    posts: [Post!]!
  }

  type Like {
    id: ID!
    userId: String!
    postId: String!
    user: User!
    post: Post!
    createdAt: DateTime!
  }

  type Comment {
    id: ID!
    content: String!
    userId: String!
    postId: String!
    user: User!
    post: Post!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    # User Queries
    user(id: ID!): User
    users: [User!]!

    # Post Queries
    post(id: ID!): Post
    posts: [Post!]!

    # Category Queries
    category(id: ID!): Category
    categories: [Category!]!

    # Like Queries
    like(id: ID!): Like
    likes: [Like!]!

    # Comment Queries
    comment(id: ID!): Comment
    comments: [Comment!]!
  }

  type Mutation {
    # User Mutations
    createUser(name: String, email: String!, image: String): User!
    updateUser(id: ID!, name: String, email: String, image: String): User!
    deleteUser(id: ID!): User!

    # Post Mutations
    createPost(title: String!, content: String!, authorId: String!, thumbnail: String): Post!
    updatePost(id: ID!, title: String, content: String, thumbnail: String): Post!
    deletePost(id: ID!): Post!

    # Category Mutations
    createCategory(name: String!): Category!
    updateCategory(id: ID!, name: String!): Category!
    deleteCategory(id: ID!): Category!

    # Like Mutations
    createLike(userId: String!, postId: String!): Like!
    deleteLike(id: ID!): Like!

    # Comment Mutations
    createComment(content: String!, userId: String!, postId: String!): Comment!
    updateComment(id: ID!, content: String!): Comment!
    deleteComment(id: ID!): Comment!
  }
`;

export default typeDefs;