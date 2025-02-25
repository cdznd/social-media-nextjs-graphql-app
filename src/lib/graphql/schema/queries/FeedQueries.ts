import {
    extendType,
    nonNull,
    stringArg,
    intArg,
    arg
} from "nexus";

import { Context } from "../../../prisma/context";
import {
    DefaultFeedResponse,
    InfoFeedResponse
} from "../types/Feed";
import { SortOrder } from "../enums";
import PostService from "@/services/PostService";

export const FeedQueries = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field(
            'privateFeedPosts',
            {
                type: DefaultFeedResponse,
                args: {
                    userId: nonNull(stringArg()),
                    searchString: stringArg(),
                    category: stringArg(),
                    visibility: stringArg(),
                    orderBy: arg({ type: SortOrder, default: 'desc' }),
                    skip: intArg(),
                    take: intArg(),
                },
                resolve: async (_parent, args, context: Context) => {
                    const { userId, searchString, category, visibility, orderBy, skip, take } = args;
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
                            category: category ?? undefined,
                            visibility: visibility ?? undefined
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
                    visibility: stringArg(),
                    orderBy: arg({ type: SortOrder, default: 'desc' }),
                    skip: intArg(),
                    take: intArg(),
                },
                resolve: async (_parent, args, context: Context) => {
                    const { userId, searchString, category, visibility, orderBy, skip, take } = args;
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
                            category: category ?? undefined,
                            visibility: visibility ?? undefined
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
    }
});