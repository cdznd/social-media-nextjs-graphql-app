import { Context } from "@/lib/prisma/context"
import {
    FeedOptions,
    FeedFilters,
    PostWhereInput,
    CreatePostDTO
} from "@/types/post"

export default class PostService {
    
    constructor(
        private context: Context
    ) {}

    async createPost({ title, content, authorId, thumbnail, categories }: CreatePostDTO) {
        return this.context.prisma.post.create({
            data: {
                title: title as string,
                content: content as string,
                authorId: authorId as string,
                thumbnail,
                categories: {
                    connectOrCreate: categories.map(category => ({
                        where: { name: category },
                        create: { name: category }
                    }))
                }
            },
        })
    }

    async getPostById(postId: string) {
        const result = await this.context.prisma.post.findUnique({
            where: { id: postId }
        })
        if(!result) {
            throw new Error('Post not found')
        }
        return result
    }

    async getPosts() {
        const result = await this.context.prisma.post.findMany({})
        if(!result) {
            throw new Error('Posts not found')
        }
        return result
    }

    async getFeedByUserId(
        userId: string,
        options: FeedOptions,
        filters: FeedFilters,
    ) {
        const { orderBy, skip, take = 10} = options // TODO: Take is by default 10, better organize it
        const { searchString, category } = filters
        // Where clause matching search string AND category if it exists
        const where: PostWhereInput = {
            AND: [
                searchString
                    ? {
                        OR: [
                            { title: { contains: searchString, mode: 'insensitive' } },
                            { content: { contains: searchString, mode: 'insensitive' } }
                        ]
                    } : {},
                category
                    ? { categories: { some: { name: { equals: category, mode: "insensitive" } } } }
                    : {}
            ]
        }
        const totalCount = await this.context.prisma.post.count({ where })
        const totalPages = Math.ceil(totalCount / take)
        const posts = await this.context.prisma.post.findMany({
            where,
            orderBy: { createdAt: orderBy },
            skip,
            take,
            include: {
                author: true,
                likes: true,
                comments: true,
                categories: true,
            },
        })
        return { posts, totalCount, totalPages }
    }

    // TODO: Implement unit tests
    async getPublicFeed(
        options: FeedOptions,
        filters: FeedFilters,
    ) {
        const { orderBy, skip, take = 10} = options // TODO: Take is by default 10, better organize it
        const { searchString, category } = filters
        // Where clause matching search string AND category if it exists
        const where: PostWhereInput = {
            AND: [
                searchString
                    ? {
                        OR: [
                            { title: { contains: searchString, mode: 'insensitive' } },
                            { content: { contains: searchString, mode: 'insensitive' } }
                        ]
                    } : {},
                category
                    ? { categories: { some: { name: { equals: category, mode: "insensitive" } } } }
                    : {}
            ]
        }
        const totalCount = await this.context.prisma.post.count({ where })
        const totalPages = Math.ceil(totalCount / take)
        const posts = await this.context.prisma.post.findMany({
            where,
            orderBy: { createdAt: orderBy },
            skip,
            take,
            include: {
                author: true,
                likes: true,
                comments: true,
                categories: true,
            },
        })
        return { posts, totalCount, totalPages }
    }

}