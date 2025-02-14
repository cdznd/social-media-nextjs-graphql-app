import { Context } from "@/lib/prisma/context"

export default class PostService {
    
    constructor(
        private context: Context
    ) {}

    async getPostById(postId: string) {
        return this.context.prisma.post.findUnique({
            where: { id: postId }
        })
    }

    async getPosts() {
        return this.context.prisma.post.findMany({})
    }

    // TODO: Replace any types
    async getFeedByUserId(userId: string, filters: any, options: any) {
        const { searchString, category } = filters
        const { orderBy } = options
        return this.context.prisma.post.findMany({
            where: {
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
            },
            orderBy: { createdAt: orderBy as "asc" | "desc" },
            include: {
                author: true,
                likes: true,
                comments: true,
                categories: true,
            },
        })
    }

}