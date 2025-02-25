import {
    extendType,
    nonNull,
    stringArg
} from "nexus"

import { Context } from "@/lib/prisma/context"
import { Like } from "../types/Like"
import LikeService from "@/services/LikeService"
import UserService from "@/services/UserService"
import PostService from "@/services/PostService"
import NotificationService from "@/services/NotificationService"

export const LikeMutations = extendType({
    type: "Mutation",
    definition(t) {
        t.field(
            'triggerLike',
            {
                type: Like,
                args: {
                    userId: nonNull(stringArg()),
                    postId: nonNull(stringArg())
                },
                resolve: async (_parent, args, context: Context) => {
                    const { userId, postId } = args
                    const likeService = new LikeService(context)
                    const triggerLikeResult = await likeService.triggerLike({ userId, postId })
                    // Getting user
                    const userService = new UserService(context)
                    const user = await userService.getUserById(userId)
                    // Getting post
                    const postService = new PostService(context)
                    const likedPost = await postService.getPostById(postId)
                    const notificationService = new NotificationService(context)
                    await notificationService.createNotification({
                        type: 'LIKE',
                        content: `Post ${likedPost.title} was liked by ${user?.name}`,
                        userId: likedPost.authorId, // Sending the notification to the post author id
                        actorId: userId, // The user that accepted that liked the post
                        entityType: 'POST',
                        entityId: postId
                    })
                    return triggerLikeResult
                }
            }
        )
    }
})