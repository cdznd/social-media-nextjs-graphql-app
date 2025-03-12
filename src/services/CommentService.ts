import { Context } from "@/lib/prisma/context"

export default class CommentService {

    constructor(
        private context: Context
    ) {}

    async createComment(
        content: string,
        userId: string,
        postId: string
    ) {
        return this.context.prisma.comment.create({
            data: {
                content: content,
                userId: userId,
                postId: postId
            },
        })
    }

}