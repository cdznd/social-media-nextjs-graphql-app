
import { Context } from "@/lib/prisma/context"

type TriggerLikeDTO = {
    userId: string
    postId: string
}

export default class LikeService {

    constructor(
        private context: Context
    ) { }

    async triggerLike({ userId, postId }: TriggerLikeDTO) {
        // Checks if the like for the post by the user alredy exists
        const existingLike = await this.context.prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId: userId as string,
                    postId: postId as string
                }
            }
        })
        // If it exists, delete it, if not create.
        if (existingLike) {
            return this.context.prisma.like.delete({
                where: {
                    userId_postId: {
                        userId: userId as string,
                        postId: postId as string
                    }
                }
            })
        } else {
            return this.context.prisma.like.create({
                data: {
                    userId,
                    postId
                }
            })
        }
    }

}