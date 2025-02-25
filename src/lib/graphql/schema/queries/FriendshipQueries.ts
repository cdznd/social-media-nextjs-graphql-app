import {
    extendType,
    nonNull,
    stringArg
} from "nexus";

import { Context } from "@/lib/prisma/context";
import { Friendship } from "../types/Friendship"
import FriendshipService from "@/services/FriendshipService"

export const FriendshipQueries = extendType({
    type: 'Query',
    definition(t) {
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
    }
    
})