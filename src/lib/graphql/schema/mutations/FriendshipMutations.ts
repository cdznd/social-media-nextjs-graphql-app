import {
    extendType,
    nonNull,
    stringArg
} from "nexus"
import { Context } from "@/lib/prisma/context"
import { Friendship } from "../types/Friendship"
import FriendshipService from "@/services/FriendshipService"
import NotificationService from "@/services/NotificationService"

export const FriendshipMutations = extendType({
    type: "Mutation",
    definition(t) {
        t.field(
            'createFriendshipRequest',
            {
                type: Friendship,
                args: {
                    fromUserId: nonNull(stringArg()),
                    toUserId: nonNull(stringArg()),
                },
                resolve: async (_parent, args, context: Context) => {
                    const { fromUserId, toUserId } = args
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
            }
        )
        t.field(
            'updateFriendshipStatus',
            {
                type: Friendship,
                args: {
                    friendshipId: nonNull(stringArg()),
                    status: nonNull('FriendshipStatus')
                },
                resolve: async (_parent, args, context: Context) => {
                    const { friendshipId, status = 'PENDING' } = args
                    // Create friendship services
                    const friendshipService = new FriendshipService(context)
                    // Get exiting notification to update
                    const existingFriendship = await friendshipService.getFriendshipById(friendshipId)
                    // If don't exist throw an error
                    if (!existingFriendship) {
                        throw new Error('Friendship not found')
                    }
                    // Update the existing friendship to REJECTED or ACCEPTED
                    const updateFriendshipStatusResult
                        = await friendshipService.updateFriendshipStatus({ friendshipId, status })
                    // Creating notification
                    const notificationService = new NotificationService(context)
                    const notificationContent = status === 'ACCEPTED'
                        ? "Friendship accepted, check your new friend's posts"
                        : "Friendship rejected"
                    // The user A is who sent the request, so it's always user B accepting the request
                    await notificationService.createNotification({
                        type: 'FRIEND_REQUEST_RESPONSE',
                        content: notificationContent,
                        userId: existingFriendship.userA.id, // Sending the accept request to the sender
                        actorId: existingFriendship.userB.id, // The user that accepted the request
                        entityType: 'FRIENDSHIP',
                        entityId: existingFriendship.id
                    })
                    return updateFriendshipStatusResult
                }
            }
        )
        t.field(
            'deleteFriendship',
            {
                type: Friendship,
                args: {
                    friendshipId: nonNull(stringArg())
                },
                resolve: async (_parent, args, context: Context) => {
                    const { friendshipId } = args
                    const friendshipService = new FriendshipService(context)
                    const notificationService = new NotificationService(context)
                    await notificationService.deleteFriendshipNotification(friendshipId)
                    return friendshipService.deleteFriendship(friendshipId)
                }
            }
        )
    }
})