import {
    extendType,
    nonNull,
    stringArg
} from 'nexus'

import { Context } from '@/lib/prisma/context'
import { Post } from '../types/Post'
import PostService from '@/services/PostService'

export const PostQueries = extendType({
    type: 'Query',
    definition(t) {
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
    }
})