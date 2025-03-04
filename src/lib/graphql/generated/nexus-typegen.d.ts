/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../../prisma/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    DateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    DateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  FriendshipStatus: "ACCEPTED" | "PENDING" | "REJECTED"
  NotificationEntityType: "COMMENT" | "FRIENDSHIP" | "POST"
  NotificationType: "COMMENT" | "FRIEND_REQUEST" | "FRIEND_REQUEST_RESPONSE" | "LIKE"
  PostVisibilityType: "PRIVATE" | "PUBLIC"
  SortOrder: "asc" | "desc"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Account: { // root type
    access_token?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    expires_at?: number | null; // Int
    id_token?: string | null; // String
    provider?: string | null; // String
    providerAccountId?: string | null; // String
    refresh_token?: string | null; // String
    scope?: string | null; // String
    session_state?: string | null; // String
    token_type?: string | null; // String
    type?: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user?: NexusGenRootTypes['User'] | null; // User
    userId?: string | null; // String
  }
  Authenticator: { // root type
    counter?: number | null; // Int
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    credentialBackedUp?: boolean | null; // Boolean
    credentialDeviceType?: string | null; // String
    credentialID?: string | null; // String
    credentialPublicKey?: string | null; // String
    providerAccountId?: string | null; // String
    transports?: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user?: NexusGenRootTypes['User'] | null; // User
    userId?: string | null; // String
  }
  Category: { // root type
    id?: string | null; // ID
    name?: string | null; // String
    posts?: NexusGenRootTypes['Post'][] | null; // [Post!]
  }
  Comment: { // root type
    content?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id?: string | null; // ID
    post?: NexusGenRootTypes['Post'] | null; // Post
    postId?: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user?: NexusGenRootTypes['User'] | null; // User
    userId?: string | null; // String
  }
  DefaultFeedResponse: { // root type
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    totalCount: number; // Int!
    totalPages: number; // Int!
  }
  DefaultUserListResponse: { // root type
    totalCount: number; // Int!
    totalPages: number; // Int!
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  FriendWithStatus: { // root type
    status: NexusGenEnums['FriendshipStatus']; // FriendshipStatus!
    user: NexusGenRootTypes['User']; // User!
  }
  Friendship: { // root type
    id?: string | null; // String
    status?: string | null; // String
    userA?: NexusGenRootTypes['User'] | null; // User
    userB?: NexusGenRootTypes['User'] | null; // User
  }
  InfoFeedResponse: { // root type
    privatePostsCount: number; // Int!
    publicPostsCount: number; // Int!
  }
  Like: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id?: string | null; // ID
    post?: NexusGenRootTypes['Post'] | null; // Post
    postId?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
    userId?: string | null; // String
  }
  Mutation: {};
  Notification: { // root type
    actor?: NexusGenRootTypes['User'] | null; // User
    actorId: string; // String!
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    entityId?: string | null; // String
    entityType: NexusGenEnums['NotificationEntityType']; // NotificationEntityType!
    expiresAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // ID!
    read: boolean; // Boolean!
    type: NexusGenEnums['NotificationType']; // NotificationType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user?: NexusGenRootTypes['User'] | null; // User
    userId: string; // String!
  }
  Post: { // root type
    author?: NexusGenRootTypes['User'] | null; // User
    authorId?: string | null; // String
    categories?: NexusGenRootTypes['Category'][] | null; // [Category!]
    comments?: NexusGenRootTypes['Comment'][] | null; // [Comment!]
    content?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id?: string | null; // ID
    likes?: NexusGenRootTypes['Like'][] | null; // [Like!]
    thumbnail?: string | null; // String
    title?: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    visibility: NexusGenEnums['PostVisibilityType']; // PostVisibilityType!
  }
  Query: {};
  Session: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    expires: NexusGenScalars['DateTime']; // DateTime!
    sessionToken?: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user?: NexusGenRootTypes['User'] | null; // User
    userId?: string | null; // String
  }
  User: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email?: string | null; // String
    emailVerified?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // ID
    image?: string | null; // String
    likes?: NexusGenRootTypes['Like'][] | null; // [Like!]
    name?: string | null; // String
    notificationsReceived?: NexusGenRootTypes['Notification'][] | null; // [Notification!]
    notificationsSent?: NexusGenRootTypes['Notification'][] | null; // [Notification!]
    password?: string | null; // String
    posts?: NexusGenRootTypes['Post'][] | null; // [Post!]
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
  VerificationToken: { // root type
    expires: NexusGenScalars['DateTime']; // DateTime!
    identifier?: string | null; // String
    token?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Account: { // field return type
    access_token: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    expires_at: number | null; // Int
    id_token: string | null; // String
    provider: string | null; // String
    providerAccountId: string | null; // String
    refresh_token: string | null; // String
    scope: string | null; // String
    session_state: string | null; // String
    token_type: string | null; // String
    type: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // String
  }
  Authenticator: { // field return type
    counter: number | null; // Int
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    credentialBackedUp: boolean | null; // Boolean
    credentialDeviceType: string | null; // String
    credentialID: string | null; // String
    credentialPublicKey: string | null; // String
    providerAccountId: string | null; // String
    transports: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // String
  }
  Category: { // field return type
    id: string | null; // ID
    name: string | null; // String
    posts: NexusGenRootTypes['Post'][] | null; // [Post!]
  }
  Comment: { // field return type
    content: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string | null; // ID
    post: NexusGenRootTypes['Post'] | null; // Post
    postId: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // String
  }
  DefaultFeedResponse: { // field return type
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    totalCount: number; // Int!
    totalPages: number; // Int!
  }
  DefaultUserListResponse: { // field return type
    totalCount: number; // Int!
    totalPages: number; // Int!
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  FriendWithStatus: { // field return type
    status: NexusGenEnums['FriendshipStatus']; // FriendshipStatus!
    user: NexusGenRootTypes['User']; // User!
  }
  Friendship: { // field return type
    id: string | null; // String
    status: string | null; // String
    userA: NexusGenRootTypes['User'] | null; // User
    userB: NexusGenRootTypes['User'] | null; // User
  }
  InfoFeedResponse: { // field return type
    privatePostsCount: number; // Int!
    publicPostsCount: number; // Int!
  }
  Like: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string | null; // ID
    post: NexusGenRootTypes['Post'] | null; // Post
    postId: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // String
  }
  Mutation: { // field return type
    createCategory: NexusGenRootTypes['Category'] | null; // Category
    createFriendshipRequest: NexusGenRootTypes['Friendship'] | null; // Friendship
    createNotification: NexusGenRootTypes['Notification'] | null; // Notification
    createPost: NexusGenRootTypes['Post'] | null; // Post
    createUser: NexusGenRootTypes['User'] | null; // User
    deleteFriendship: NexusGenRootTypes['Friendship'] | null; // Friendship
    deleteNotification: NexusGenRootTypes['Notification'] | null; // Notification
    triggerLike: NexusGenRootTypes['Like'] | null; // Like
    updateFriendshipStatus: NexusGenRootTypes['Friendship'] | null; // Friendship
    updateNotificationReadStatus: NexusGenRootTypes['Notification'] | null; // Notification
  }
  Notification: { // field return type
    actor: NexusGenRootTypes['User'] | null; // User
    actorId: string; // String!
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    entityId: string | null; // String
    entityType: NexusGenEnums['NotificationEntityType']; // NotificationEntityType!
    expiresAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // ID!
    read: boolean; // Boolean!
    type: NexusGenEnums['NotificationType']; // NotificationType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User'] | null; // User
    userId: string; // String!
  }
  Post: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    authorId: string | null; // String
    categories: NexusGenRootTypes['Category'][] | null; // [Category!]
    comments: NexusGenRootTypes['Comment'][] | null; // [Comment!]
    content: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string | null; // ID
    likes: NexusGenRootTypes['Like'][] | null; // [Like!]
    thumbnail: string | null; // String
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    visibility: NexusGenEnums['PostVisibilityType']; // PostVisibilityType!
  }
  Query: { // field return type
    allUsers: NexusGenRootTypes['DefaultUserListResponse']; // DefaultUserListResponse!
    categories: NexusGenRootTypes['Category'][]; // [Category!]!
    exploreFeedPosts: NexusGenRootTypes['DefaultFeedResponse']; // DefaultFeedResponse!
    friends: NexusGenRootTypes['Friendship'][]; // [Friendship!]!
    friendship: NexusGenRootTypes['Friendship'] | null; // Friendship
    likes: Array<NexusGenRootTypes['Like'] | null>; // [Like]!
    notifications: NexusGenRootTypes['Notification'][]; // [Notification!]!
    privateFeedPosts: NexusGenRootTypes['DefaultFeedResponse']; // DefaultFeedResponse!
    privateProfileFeed: NexusGenRootTypes['DefaultFeedResponse']; // DefaultFeedResponse!
    privateProfileFeedInfo: NexusGenRootTypes['InfoFeedResponse']; // InfoFeedResponse!
    readNotifications: NexusGenRootTypes['Notification'][]; // [Notification!]!
    user: NexusGenRootTypes['User'] | null; // User
  }
  Session: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    expires: NexusGenScalars['DateTime']; // DateTime!
    sessionToken: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // String
  }
  User: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string | null; // String
    emailVerified: NexusGenScalars['DateTime'] | null; // DateTime
    friends: NexusGenRootTypes['FriendWithStatus'][] | null; // [FriendWithStatus!]
    id: string | null; // ID
    image: string | null; // String
    likes: NexusGenRootTypes['Like'][] | null; // [Like!]
    name: string | null; // String
    notificationsReceived: NexusGenRootTypes['Notification'][] | null; // [Notification!]
    notificationsSent: NexusGenRootTypes['Notification'][] | null; // [Notification!]
    password: string | null; // String
    posts: NexusGenRootTypes['Post'][] | null; // [Post!]
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
  VerificationToken: { // field return type
    expires: NexusGenScalars['DateTime']; // DateTime!
    identifier: string | null; // String
    token: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Account: { // field return type name
    access_token: 'String'
    createdAt: 'DateTime'
    expires_at: 'Int'
    id_token: 'String'
    provider: 'String'
    providerAccountId: 'String'
    refresh_token: 'String'
    scope: 'String'
    session_state: 'String'
    token_type: 'String'
    type: 'String'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
  }
  Authenticator: { // field return type name
    counter: 'Int'
    createdAt: 'DateTime'
    credentialBackedUp: 'Boolean'
    credentialDeviceType: 'String'
    credentialID: 'String'
    credentialPublicKey: 'String'
    providerAccountId: 'String'
    transports: 'String'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
  }
  Category: { // field return type name
    id: 'ID'
    name: 'String'
    posts: 'Post'
  }
  Comment: { // field return type name
    content: 'String'
    createdAt: 'DateTime'
    id: 'ID'
    post: 'Post'
    postId: 'String'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
  }
  DefaultFeedResponse: { // field return type name
    posts: 'Post'
    totalCount: 'Int'
    totalPages: 'Int'
  }
  DefaultUserListResponse: { // field return type name
    totalCount: 'Int'
    totalPages: 'Int'
    users: 'User'
  }
  FriendWithStatus: { // field return type name
    status: 'FriendshipStatus'
    user: 'User'
  }
  Friendship: { // field return type name
    id: 'String'
    status: 'String'
    userA: 'User'
    userB: 'User'
  }
  InfoFeedResponse: { // field return type name
    privatePostsCount: 'Int'
    publicPostsCount: 'Int'
  }
  Like: { // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    post: 'Post'
    postId: 'String'
    user: 'User'
    userId: 'String'
  }
  Mutation: { // field return type name
    createCategory: 'Category'
    createFriendshipRequest: 'Friendship'
    createNotification: 'Notification'
    createPost: 'Post'
    createUser: 'User'
    deleteFriendship: 'Friendship'
    deleteNotification: 'Notification'
    triggerLike: 'Like'
    updateFriendshipStatus: 'Friendship'
    updateNotificationReadStatus: 'Notification'
  }
  Notification: { // field return type name
    actor: 'User'
    actorId: 'String'
    content: 'String'
    createdAt: 'DateTime'
    entityId: 'String'
    entityType: 'NotificationEntityType'
    expiresAt: 'DateTime'
    id: 'ID'
    read: 'Boolean'
    type: 'NotificationType'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
  }
  Post: { // field return type name
    author: 'User'
    authorId: 'String'
    categories: 'Category'
    comments: 'Comment'
    content: 'String'
    createdAt: 'DateTime'
    id: 'ID'
    likes: 'Like'
    thumbnail: 'String'
    title: 'String'
    updatedAt: 'DateTime'
    visibility: 'PostVisibilityType'
  }
  Query: { // field return type name
    allUsers: 'DefaultUserListResponse'
    categories: 'Category'
    exploreFeedPosts: 'DefaultFeedResponse'
    friends: 'Friendship'
    friendship: 'Friendship'
    likes: 'Like'
    notifications: 'Notification'
    privateFeedPosts: 'DefaultFeedResponse'
    privateProfileFeed: 'DefaultFeedResponse'
    privateProfileFeedInfo: 'InfoFeedResponse'
    readNotifications: 'Notification'
    user: 'User'
  }
  Session: { // field return type name
    createdAt: 'DateTime'
    expires: 'DateTime'
    sessionToken: 'String'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
  }
  User: { // field return type name
    createdAt: 'DateTime'
    email: 'String'
    emailVerified: 'DateTime'
    friends: 'FriendWithStatus'
    id: 'ID'
    image: 'String'
    likes: 'Like'
    name: 'String'
    notificationsReceived: 'Notification'
    notificationsSent: 'Notification'
    password: 'String'
    posts: 'Post'
    updatedAt: 'DateTime'
    username: 'String'
  }
  VerificationToken: { // field return type name
    expires: 'DateTime'
    identifier: 'String'
    token: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createCategory: { // args
      name: string; // String!
    }
    createFriendshipRequest: { // args
      fromUserId: string; // String!
      toUserId: string; // String!
    }
    createNotification: { // args
      actorId: string; // String!
      content: string; // String!
      entityId: string; // String!
      entityType: NexusGenEnums['NotificationEntityType']; // NotificationEntityType!
      read: boolean; // Boolean!
      type: NexusGenEnums['NotificationType']; // NotificationType!
      userId: string; // String!
    }
    createPost: { // args
      authorId: string; // String!
      categories: string[]; // [String!]!
      content: string; // String!
      thumbnail?: string | null; // String
      title: string; // String!
    }
    createUser: { // args
      email: string; // String!
      image?: string | null; // String
      name: string; // String!
      password: string; // String!
      username: string; // String!
    }
    deleteFriendship: { // args
      friendshipId: string; // String!
    }
    deleteNotification: { // args
      notificationId: string; // String!
    }
    triggerLike: { // args
      postId: string; // String!
      userId: string; // String!
    }
    updateFriendshipStatus: { // args
      friendshipId: string; // String!
      status: NexusGenEnums['FriendshipStatus']; // FriendshipStatus!
    }
    updateNotificationReadStatus: { // args
      notificationId: string; // String!
    }
  }
  Query: {
    allUsers: { // args
      searchString?: string | null; // String
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    exploreFeedPosts: { // args
      category?: string | null; // String
      orderBy: NexusGenEnums['SortOrder'] | null; // SortOrder
      searchString?: string | null; // String
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    friends: { // args
      userId: string; // String!
    }
    friendship: { // args
      fromUserId: string; // String!
      toUserId: string; // String!
    }
    notifications: { // args
      userId: string; // String!
    }
    privateFeedPosts: { // args
      category?: string | null; // String
      orderBy: NexusGenEnums['SortOrder'] | null; // SortOrder
      searchString?: string | null; // String
      skip?: number | null; // Int
      take?: number | null; // Int
      userId: string; // String!
      visibility?: string | null; // String
    }
    privateProfileFeed: { // args
      category?: string | null; // String
      orderBy: NexusGenEnums['SortOrder'] | null; // SortOrder
      searchString?: string | null; // String
      skip?: number | null; // Int
      take?: number | null; // Int
      userId: string; // String!
      visibility?: string | null; // String
    }
    privateProfileFeedInfo: { // args
      userId: string; // String!
    }
    readNotifications: { // args
      userId: string; // String!
    }
    user: { // args
      userId: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}