import {
    stringArg,
    makeSchema,
    objectType,
    asNexusMethod,
    arg,
    nonNull,
    mutationType,
    list,
    booleanArg,
    intArg,
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
import { Notification } from './objects/Notification';
import { DefaultFeedResponse, InfoFeedResponse } from './objects/Feed';
// Enums
import {
    SortOrder,
    FriendshipStatus,
    NotificationType,
    NotificationEntityType,
    PostVisibilityType
} from './enums/common';
// Services
import UserService from '@/services/UserService';
import FriendshipService from '@/services/FriendshipService';
import PostService from '@/services/PostService';
import CategoryService from '@/services/CategoryService';
import LikeService from '@/services/LikeService';
import NotificationService from '@/services/NotificationService';
// Utils
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
        t.nonNull.list.field("likes", {
            type: Like,
            resolve: (parent, args, context) => {
                return context.prisma.like.findMany({});
            },
        });
        t.nonNull.field(
            'privateFeedPosts',
            {
                type: DefaultFeedResponse,
                args: {
                    userId: nonNull(stringArg()),
                    searchString: stringArg(),
                    category: stringArg(),
                    orderBy: arg({ type: SortOrder, default: 'desc' }),
                    skip: intArg(),
                    take: intArg(),
                },
                resolve: async (_parent, args, context: Context) => {
                    const { userId, searchString, category, orderBy, skip, take } = args;
                    const postService = new PostService(context)
                    const { posts, totalCount, totalPages } = await postService.getFeedByUserId(
                        userId,
                        {
                            orderBy: orderBy ?? 'desc',
                            skip: skip ?? undefined,
                            take: take ?? undefined
                        },
                        {
                            searchString: searchString ?? undefined,
                            category: category ?? undefined
                        },
                    )
                    return { posts, totalCount, totalPages }
                }
            }
        )
        t.nonNull.field(
            'exploreFeedPosts',
            {
                type: DefaultFeedResponse,
                args: {
                    searchString: stringArg(),
                    category: stringArg(),
                    orderBy: arg({ type: SortOrder, default: 'desc' }),
                    skip: intArg(),
                    take: intArg(),
                },
                resolve: async (_parent, args, context: Context) => {
                    const { searchString, category, orderBy, skip, take } = args;
                    const postService = new PostService(context)
                    const { posts, totalCount, totalPages } = await postService.getPublicFeed(
                        {
                            orderBy: orderBy ?? 'desc',
                            skip: skip ?? undefined,
                            take: take ?? undefined
                        },
                        {
                            searchString: searchString ?? undefined,
                            category: category ?? undefined
                        },
                    )
                    return { posts, totalCount, totalPages } 
                }
            }
        )
        t.nonNull.field(
            'privateProfileFeed',
            {
                type: DefaultFeedResponse,
                args: {
                    userId: nonNull(stringArg()),
                    searchString: stringArg(),
                    category: stringArg(),
                    orderBy: arg({ type: SortOrder, default: 'desc' }),
                    skip: intArg(),
                    take: intArg(),
                },
                resolve: async (_parent, args, context: Context) => {
                    const { userId, searchString, category, orderBy, skip, take } = args;
                    const postService = new PostService(context)
                    const { posts, totalCount, totalPages } = await postService.getProfileFeed(
                        userId,
                        {
                            orderBy: orderBy ?? 'desc',
                            skip: skip ?? undefined,
                            take: take ?? undefined
                        },
                        {
                            searchString: searchString ?? undefined,
                            category: category ?? undefined
                        },
                    )
                    return { posts, totalCount, totalPages } 
                }
            }
        )
        t.nonNull.field(
            'privateProfileFeedInfo',
            {
                type: InfoFeedResponse,
                args: {
                    userId: nonNull(stringArg()),
                },
                resolve: async (_parent, args, context: Context) => {
                    const { userId } = args;
                    const postService = new PostService(context)
                    const { privatePostsCount, publicPostsCount } = await postService.getProfileFeedInfo(userId)
                    return { privatePostsCount, publicPostsCount }
                }
            }
        )
        t.nonNull.list.nonNull.field('categories', {
            type: Category,
            resolve: async (_parent, args, context: Context) => {
                const categoryService = new CategoryService(context)
                return categoryService.getCategories()
            }
        })
        t.field('friendship', {
            type: Friendship,
            args: {
                fromUserId: nonNull(stringArg()),
                toUserId: nonNull(stringArg()),
            },
            resolve: async (_parent, args, context: Context) => {
                // TODO: Fix typo error
                const { fromUserId, toUserId } = args
                const friendshipService = new FriendshipService(context)
                return friendshipService.getFriendship(fromUserId, toUserId)
            }
        })
        t.nonNull.list.nonNull.field('notifications', {
            type: Notification,
            args: {
                userId: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const { userId } = args
                const notificationService = new NotificationService(context)
                return notificationService.getNotifications(userId)
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
        t.field('createFriendshipRequest', {
            type: Friendship,
            args: {
                fromUserId: nonNull(stringArg()),
                toUserId: nonNull(stringArg()),
            },
            resolve: async (_parent, args, context: Context) => {
                const { fromUserId, toUserId } = args

                console.log('inside create');
                console.log('fromUserId', fromUserId);
                console.log('toUserId', toUserId);

                const friendshipService = new FriendshipService(context)
                const notificationService = new NotificationService(context)
                // First create the friendship
                const createdFriendship = await friendshipService.createFriendship({ fromUserId, toUserId })
                // Create the notification with the friendship data
                await notificationService.createNotification({
                    type: 'FRIEND_REQUEST',
                    content: 'someone has sent you a friend request!',
                    userId: toUserId,
                    actorId: fromUserId,
                    entityType: 'FRIENDSHIP',
                    entityId: createdFriendship?.id
                })
                return createdFriendship
            }
        })
        t.field('updateFriendshipStatus', {
            type: Friendship,
            args: {
                friendshipId: nonNull(stringArg()),
                status: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                // TODO: Fix typo errors
                const { friendshipId, status } = args

                console.log('friendshipId', friendshipId);
                console.log('status', status);

                const friendshipService = new FriendshipService(context)
                return friendshipService.updateFriendshipStatus({ friendshipId, status })
            }
        })
        t.field('deleteFriendship', {
            type: Friendship,
            args: {
                friendshipId: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const { friendshipId } = args
                const friendshipService = new FriendshipService(context)
                const notificationService = new NotificationService(context)
                await notificationService.deleteFriendRequestNotification(friendshipId)
                return friendshipService.deleteFriendship(friendshipId)
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
        t.field('createNotification', {
            type: Notification,
            args: {
                type: nonNull(arg({ type: 'NotificationType' })),
                content: nonNull(stringArg()),
                userId: nonNull(stringArg()),
                actorId: nonNull(stringArg()),
                entityId: nonNull(stringArg()),
                entityType: nonNull(arg({ type: 'NotificationEntityType' })),
                read: nonNull(booleanArg({ default: false }))
            },
            resolve: async (_parent, args, context: Context) => {
                const { type, content, userId, actorId, entityId, entityType, read } = args
                const notificationService = new NotificationService(context)
                return notificationService.createNotification({
                    type,
                    content,
                    userId,
                    actorId,
                    entityId,
                    entityType,
                    read
                })
            }
        }),
        t.field('updateNotificationReadStatus', {
            type: Notification,
            args: {
                notificationId: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const { notificationId } = args
                const notificationService = new NotificationService(context)
                return notificationService.updateNotificationReadStatus(notificationId)
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
        DefaultFeedResponse,
        InfoFeedResponse,
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
        Notification,
        NotificationType,
        NotificationEntityType,
        PostVisibilityType,
        DateTime,
        FriendshipStatus,
        SortOrder,
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