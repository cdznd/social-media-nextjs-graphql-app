import {
    extendType,
    nonNull,
    stringArg,
    list
} from "nexus"

import { Context } from "@/lib/prisma/context"
import { Post } from "../types/Post"
import PostService from "@/services/PostService"
import LikeService from "@/services/LikeService"
import UserService from "@/services/UserService"
import NotificationService from "@/services/NotificationService"

export const PostMutations = extendType({
    type: 'Mutation',
    definition(t) {
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
        t.field(
            'triggerLike',
            {
                type: Post,
                args: {
                    userId: nonNull(stringArg()),
                    postId: nonNull(stringArg())
                },
                resolve: async (_parent, args, context: Context) => {
                    const { userId, postId } = args
                    const likeService = new LikeService(context)
                    // Trigger the like
                    await likeService.triggerLike({ userId, postId })
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
                    return likedPost
                }
            }
        )
    }
})