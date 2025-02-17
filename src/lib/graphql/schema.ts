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
import path from 'path';
import { Context } from '../prisma/context';
// ObjectTypes
import { User, Account, Session, VerificationToken, Authenticator, FriendWithStatus } from './objects/Auth'
import { Friendship } from './objects/Friendship';
import { Post } from './objects/Post';
import { Category } from './objects/Category';
import { Like } from './objects/Like';
import { Comment } from './objects/Comment';
// Enums
import { SortOrder, FriendshipStatus } from './enums/common';
// Services
import UserService from '@/services/UserService';
import FriendshipService from '@/services/FriendshipService';
import PostService from '@/services/PostService';
import CategoryService from '@/services/CategoryService';
import LikeService from '@/services/LikeService';

import { GraphQLDateTime } from "graphql-scalars";

const DateTime = asNexusMethod(GraphQLDateTime, "DateTime");

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nullable.field('user', {
            type: User,
            args: {
                userId: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const { userId } = args;
                const userService = new UserService(context)
                return userService.getUserById(userId)
            }
        })
        t.nonNull.list.nonNull.field('users', {
            type: User,
            resolve: async (_parent, args, context: Context) => {
                const userService = new UserService(context)
                return userService.getUsers()
            }
        })
        t.nonNull.list.nonNull.field('friends', {
            type: Friendship,
            args: {
                userId: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const { userId } = args
                const friendshipService = new FriendshipService(context)
                return friendshipService.getFriendsByUserId(userId)
            }
        })
        t.nullable.field('post', {
            type: Post,
            args: {
                postId: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const { postId } = args
                const postService = new PostService(context)
                return postService.getPostById(postId)
            }
        })
        t.nonNull.list.nonNull.field('posts', {
            type: Post,
            resolve: async (_parent, _args, context: Context) => {
                const postService = new PostService(context)
                return postService.getPosts()
            }
        })
        t.nonNull.list.nonNull.field('feedPosts', {
            type: Post,
            args: {
                userId: nonNull(stringArg()),
                searchString: stringArg(),
                category: stringArg(),
                orderBy: arg({ type: SortOrder, default: 'desc' })
            },
            resolve: async (_parent, args, context: Context) => {
                const { userId, searchString, category, orderBy = 'desc' } = args;
                const postService = new PostService(context)
                return postService.getFeedByUserId(
                    userId,
                    {
                        searchString,
                        category
                    },
                    { 
                        orderBy
                    }
                )
            }
        })
        t.nonNull.list.nonNull.field('exploreFeedPosts', {
            type: Post,
            args: {
                searchString: stringArg(),
                category: stringArg(),
                orderBy: arg({ type: SortOrder, default: 'desc' })
            },
            resolve: async (_parent, args, context: Context) => {
                const { searchString, category, orderBy = 'desc' } = args;
                const postService = new PostService(context)
                return postService.getExploreFeed(
                    {
                        searchString,
                        category
                    },
                    { 
                        orderBy
                    }
                )
            }
        })
        t.nonNull.list.nonNull.field('categories', {
            type: Category,
            resolve: async (_parent, args, context: Context) => {
                const categoryService = new CategoryService(context)
                return categoryService.getCategories()
            }
        })
    }
})

const Mutation = mutationType({
    definition(t) {
        t.field('createUser', {
            type: User,
            args: {
                name: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
                username: nonNull(stringArg()),
                image: stringArg()
            },
            resolve: async (_parent, args, context: Context) => {
                const { name, email, password, username, image } = args
                const userService = new UserService(context)
                return userService.createUser({ name, email, password, username, image })
            }
        })
        t.field('createFriendship', {
            type: Friendship,
            args: {
                fromUserId: nonNull(stringArg()),
                toUserId: nonNull(stringArg()),
                status: arg({ type: 'FriendshipStatus', default: "PENDING" })
            },
            resolve: async (_parent, args, context: Context) => {
                const { fromUserId, toUserId, status } = args
                const friendshipService = new FriendshipService(context)
                return friendshipService.createFriendship({ fromUserId, toUserId, status })
            }
        })
        t.field('createPost', {
            type: Post,
            args: {
                title: nonNull(stringArg()),
                content: nonNull(stringArg()),
                authorId: nonNull(stringArg()),
                thumbnail: stringArg(),
                categories: nonNull(list(nonNull(stringArg())))
            },
            resolve: async (_parent, args, context: Context) => {
                const { title, content, authorId, thumbnail, categories } = args
                const postService = new PostService(context)
                return postService.createPost({ title, content, authorId, thumbnail, categories })
            }
        })
        t.field('triggerLike', {
            type: Like,
            args: {
                userId: nonNull(stringArg()),
                postId: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const { userId, postId } = args
                const likeService = new LikeService(context)
                return likeService.triggerLike({ userId, postId })
            }
        })
        t.field('createCategory', {
            type: Category,
            args: {
                name: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const { name } = args
                const categoryService = new CategoryService(context)
                return categoryService.createCategory(name)
            }
        })
    }
})

// TODO: Read about build in https://nexusjs.org/docs/adoption-guides/nextjs-users
export const schema = makeSchema({
    types: [
        Query,
        Mutation,
        User,
        FriendWithStatus,
        Account,
        Session,
        VerificationToken,
        Authenticator,
        Friendship,
        Post,
        Category,
        Like,
        Comment,
        DateTime,
        FriendshipStatus,
        SortOrder
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