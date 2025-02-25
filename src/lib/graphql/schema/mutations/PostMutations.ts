import {
    extendType,
    nonNull,
    stringArg,
    list
} from "nexus"

import { Context } from "@/lib/prisma/context"
import { Post } from "../types/Post"
import PostService from "@/services/PostService"

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
    }
})