import {
    stringArg,
    makeSchema,
    objectType,
    asNexusMethod,
    arg,
    nonNull,
    mutationType,
    list,
} from 'nexus'
import { GraphQLDateTime } from "graphql-scalars";
import path from 'path';

import { Context } from '../prisma/context';

const DateTime = asNexusMethod(GraphQLDateTime, "DateTime");

import { enumType } from "nexus";

export const SortOrder = enumType({
    name: "SortOrder",
    members: ["asc", "desc"],
});

// TODO: Export all the objectType to external files. Example: https://github.com/graphql-nexus/nexus/blob/main/examples/ghost/src/schema/index.ts

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nullable.field('user', {
            type: User,
            args: {
                userId: stringArg()
            },
            resolve: async (_parent, args, context: Context) => {
                const { userId } = args;
                return await context.prisma.user.findUnique({
                    where: { id: userId ?? undefined },
                    include: {
                        posts: {
                            include: {
                                author: true
                            }
                        },
                    }
                })
            }
        }),
        t.nonNull.list.nonNull.field('users', {
            type: User,
            resolve: async (_parent, args, context: Context) => {
                return await context.prisma.user.findMany()
            }
        }),
        t.nullable.field('post', {
            type: 'Post',
            args: {
                id: stringArg()
            },
            resolve: async (_parent, args, context: Context) => {
                return await context.prisma.post.findUnique({
                    where: { id: args?.id ?? undefined }
                })
            }
        }),
        t.nonNull.list.nonNull.field('posts', {
            type: 'Post',
            resolve: async (_parent, _args, context: Context) => {
                return await context.prisma.post.findMany()
            }
        })
        t.nonNull.list.nonNull.field('feedPosts', {
            type: 'Post',
            args: {
                userId: nonNull(stringArg()),
                searchString: stringArg(),
                category: stringArg(),
                orderBy: arg({ type: SortOrder, default: "desc" })
            },
            resolve: async (_parent, args, context: Context) => {
                const { userId, searchString, category, orderBy = 'desc' } = args;
                return await context.prisma.post.findMany({
                    where: {
                        authorId: userId,
                        AND: [
                            searchString
                                ? {
                                    OR: [
                                        { title: { contains: searchString, mode: 'insensitive' } },
                                        { content: { contains: searchString, mode: 'insensitive' } }
                                    ]
                                } : {},
                            category
                                ? { categories: { some: { name: { equals: category, mode: "insensitive" } } } }
                                : {}
                        ]
                    },
                    orderBy: { createdAt: orderBy as "asc" | "desc" },
                    include: {
                        author: true,
                        likes: true,
                        comments: true,
                        categories: true,
                    },
                })
            }
        }),
            t.nonNull.list.nonNull.field('categories', {
                type: 'Category',
                resolve: async (_parent, args, context: Context) => {
                    return await context.prisma.category.findMany()
                }
            })
    }
})

const Mutation = mutationType({
    definition(t) {
        t.field('createPost', {
            type: Post,
            args: {
                title: nonNull(stringArg()),
                content: nonNull(stringArg()),
                authorId: nonNull(stringArg()),
                thumbnail: stringArg(),
                // categories: nonNull(list(nonNull(stringArg())))
            },
            resolve: async (_parent, args, context: Context) => {
                const { title, content, authorId, thumbnail } = args
                return context.prisma.post.create({
                    data: {
                        title: title as string,
                        content: content as string,
                        authorId: authorId as string,
                        thumbnail,
                    },
                })
            }
        })
    }
})

// User + Auth
const User = objectType({
    name: "User",
    definition(t) {
        t.id("id");
        t.nullable.string("name");
        t.string("email");
        t.nullable.field("emailVerified", { type: "DateTime" });
        t.nullable.string("image");
        t.list.nonNull.field("accounts", { type: "Account" });
        t.list.nonNull.field("sessions", { type: "Session" });
        t.list.nonNull.field("authenticators", { type: "Authenticator" });
        t.list.nonNull.field("posts", { type: "Post" });
        t.list.nonNull.field("likes", { type: "Like" });
        t.list.nonNull.field("comments", { type: "Comment" });
        t.nonNull.field("createdAt", { type: "DateTime" });
        t.nonNull.field("updatedAt", { type: "DateTime" });
    },
});

const Account = objectType({
    name: "Account",
    definition(t) {
        t.string("userId");
        t.string("type");
        t.string("provider");
        t.string("providerAccountId");
        t.nullable.string("refresh_token");
        t.nullable.string("access_token");
        t.nullable.int("expires_at");
        t.nullable.string("token_type");
        t.nullable.string("scope");
        t.nullable.string("id_token");
        t.nullable.string("session_state");
        t.nonNull.field("createdAt", { type: "DateTime" });
        t.nonNull.field("updatedAt", { type: "DateTime" });
        t.field("user", { type: "User" });
    },
});

const Session = objectType({
    name: "Session",
    definition(t) {
        t.string("sessionToken");
        t.string("userId");
        t.nonNull.field("expires", { type: "DateTime" });
        t.nonNull.field("createdAt", { type: "DateTime" });
        t.nonNull.field("updatedAt", { type: "DateTime" });
        t.field("user", { type: "User" });
    },
});

const VerificationToken = objectType({
    name: "VerificationToken",
    definition(t) {
        t.string("identifier");
        t.string("token");
        t.nonNull.field("expires", { type: "DateTime" });
    },
});

const Authenticator = objectType({
    name: "Authenticator",
    definition(t) {
        t.string("credentialID");
        t.string("userId");
        t.string("providerAccountId");
        t.string("credentialPublicKey");
        t.int("counter");
        t.string("credentialDeviceType");
        t.boolean("credentialBackedUp");
        t.nullable.string("transports");
        t.nonNull.field("createdAt", { type: "DateTime" });
        t.nonNull.field("updatedAt", { type: "DateTime" });
        t.field("user", { type: "User" });
    },
});

// App Components
const Post = objectType({
    name: "Post",
    definition(t) {
        t.id("id");
        t.string("title");
        t.string("content");
        t.nullable.string("thumbnail");
        t.string("authorId");
        t.field("author", { type: "User" });
        t.list.nonNull.field("likes", {
            type: "Like",
            resolve: (_parent) => _parent.likes ?? []
        });
        t.nonNull.list.nonNull.field("comments", {
            type: "Comment",
            resolve: (_parent) => _parent.comments ?? []
        });
        t.nonNull.list.nonNull.field("categories", {
            type: "Category",
            resolve: (_parent) => _parent.categories ?? []
        });
        t.nonNull.field("createdAt", { type: "DateTime" });
        t.nonNull.field("updatedAt", { type: "DateTime" });
    },
});

export const Category = objectType({
    name: "Category",
    definition(t) {
        t.id("id");
        t.string("name");
        t.nonNull.list.nonNull.field("posts", {
            type: "Post",
            resolve: (_parent) => _parent.posts ?? []
        });
    },
});

export const Like = objectType({
    name: "Like",
    definition(t) {
        t.id("id");
        t.string("userId");
        t.string("postId");
        t.field("user", { type: "User" });
        t.field("post", { type: "Post" });
        t.nonNull.field("createdAt", { type: "DateTime" });
    },
});

export const Comment = objectType({
    name: "Comment",
    definition(t) {
        t.id("id");
        t.string("content");
        t.string("userId");
        t.string("postId");
        t.field("user", { type: "User" });
        t.field("post", { type: "Post" });
        t.nonNull.field("createdAt", { type: "DateTime" });
        t.nonNull.field("updatedAt", { type: "DateTime" });
    },
});

// TODO: Read about build in https://nexusjs.org/docs/adoption-guides/nextjs-users
// Schema
export const schema = makeSchema({
    types: [
        Query,
        Mutation,
        User,
        Account,
        Session,
        VerificationToken,
        Authenticator,
        Post,
        Category,
        Like,
        Comment,
        DateTime
    ],
    outputs: {
        typegen: path.join(process.cwd(), '/src/lib/graphql/generated/nexus-typegen.d.ts'),
        schema: path.join(process.cwd(), '/src/lib/graphql/generated/schema.graphql'),
    },
    contextType: {
        module: path.join(process.cwd(), '/src/lib/prisma/context.ts'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma',
            },
        ],
    },
})