import { Context } from "@/lib/prisma/context"
import { MockContext, createMockContext } from '../lib/prisma/tests/PrismaContextUtils'

import FriendshipService from './FriendshipService'
import PostService from "./PostService"

let mockCtx: MockContext
let ctx: Context
let postService: PostService

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
    postService = new PostService(ctx)
})

describe('PostService', () => {
    describe('createPost', () => {
        const authorId = 'author-id'
        const mockNewPost = {
            id: 'post-id',
            title: 'Test Post',
            content: 'Test Content',
            authorId,
            thumbnail: 'thumbnail-url',
            categories: ['tech', 'programming'],
            createdAt: new Date(),
            updatedAt: new Date()
        }
        test('should create a post with all fields', async () => {
            mockCtx.prisma.post.create.mockResolvedValue(mockNewPost)
            const result = await postService.createPost({
                title: mockNewPost.title,
                content: mockNewPost.content,
                authorId: mockNewPost.authorId,
                thumbnail: mockNewPost.thumbnail,
                categories: mockNewPost.categories
            })
            expect(mockCtx.prisma.post.create).toHaveBeenCalledWith({
                data: {
                    title: mockNewPost.title,
                    content: mockNewPost.content,
                    authorId: mockNewPost.authorId,
                    thumbnail: mockNewPost.thumbnail,
                    categories: {
                        connectOrCreate: [
                            {
                                where: { name: 'tech' },
                                create: { name: 'tech' }
                            },
                            {
                                where: { name: 'programming' },
                                create: { name: 'programming' }
                            }
                        ]
                    }
                }
            })
            expect(result).toEqual(mockNewPost)
        })
        test('should create a post without optional thumbnail', async () => {
            const postWithoutThumbnail = {
                ...mockNewPost,
                thumbnail: null
            }
            mockCtx.prisma.post.create.mockResolvedValue(postWithoutThumbnail)
            const result = await postService.createPost({
                title: mockNewPost.title,
                content: mockNewPost.content,
                authorId: mockNewPost.authorId,
                categories: mockNewPost.categories
            })
            expect(mockCtx.prisma.post.create).toHaveBeenCalledWith({
                data: {
                    title: mockNewPost.title,
                    content: mockNewPost.content,
                    authorId: mockNewPost.authorId,
                    thumbnail: undefined,
                    categories: {
                        connectOrCreate: expect.any(Array)
                    }
                }
            })
            expect(result).toEqual(postWithoutThumbnail)
        })
        test('should create a post with empty categories array', async () => {
            const postWithoutCategories = {
                ...mockNewPost,
                categories: []
            }
            mockCtx.prisma.post.create.mockResolvedValue(postWithoutCategories)
            const result = await postService.createPost({
                title: mockNewPost.title,
                content: mockNewPost.content,
                authorId: mockNewPost.authorId,
                thumbnail: mockNewPost.thumbnail,
                categories: []
            })
            expect(mockCtx.prisma.post.create).toHaveBeenCalledWith({
                data: {
                    title: mockNewPost.title,
                    content: mockNewPost.content,
                    authorId: mockNewPost.authorId,
                    thumbnail: mockNewPost.thumbnail,
                    categories: {
                        connectOrCreate: []
                    }
                }
            })
            expect(result).toEqual(postWithoutCategories)
        })
        test('should handle database errors', async () => {
            const error = new Error('Database error')
            mockCtx.prisma.post.create.mockRejectedValue(error)
            await expect(postService.createPost({
                title: mockNewPost.title,
                content: mockNewPost.content,
                authorId: mockNewPost.authorId,
                thumbnail: mockNewPost.thumbnail,
                categories: mockNewPost.categories
            })).rejects.toThrow('Database error')
        })
    })
})
