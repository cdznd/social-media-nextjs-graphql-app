import { Context } from "@/lib/prisma/context"
import { MockContext, createMockContext } from '../lib/prisma/tests/PrismaContextUtils'
import PostService from "./PostService"
import FriendshipService from "./FriendshipService"
import { PostVisibilityType } from "@/types/post"
import { FriendshipStatus } from "@/types/friendship"

let mockCtx: MockContext
let ctx: Context
let postService: PostService
let friendshipService: FriendshipService

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
    postService = new PostService(ctx)
    friendshipService = new FriendshipService(ctx)
})

describe('PostService', () => {
    const authorId = 'author-id'
    const mockNewPost = {
        id: 'post-id',
        title: 'Test Post',
        content: 'Test Content',
        authorId,
        visibility: 'PUBLIC' as PostVisibilityType,
        thumbnail: 'thumbnail-url',
        categories: ['tech', 'programming'],
        createdAt: new Date(),
        updatedAt: new Date()
    }

    describe('createPost', () => {
        test('should create a post with all fields', async () => {
            mockCtx.prisma.post.create.mockResolvedValue(mockNewPost)
            const result = await postService.createPost({
                title: mockNewPost.title,
                content: mockNewPost.content,
                authorId: mockNewPost.authorId,
                visibility: mockNewPost.visibility as PostVisibilityType,
                thumbnail: mockNewPost.thumbnail,
                categories: mockNewPost.categories
            })
            expect(mockCtx.prisma.post.create).toHaveBeenCalledWith({
                data: {
                    title: mockNewPost.title,
                    content: mockNewPost.content,
                    authorId: mockNewPost.authorId,
                    visibility: mockNewPost.visibility,
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
                visibility: mockNewPost.visibility,
                categories: mockNewPost.categories
            })
            expect(mockCtx.prisma.post.create).toHaveBeenCalledWith({
                data: {
                    title: mockNewPost.title,
                    content: mockNewPost.content,
                    authorId: mockNewPost.authorId,
                    visibility: mockNewPost.visibility,
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
                visibility: mockNewPost.visibility,
                thumbnail: mockNewPost.thumbnail,
                categories: []
            })
            expect(mockCtx.prisma.post.create).toHaveBeenCalledWith({
                data: {
                    title: mockNewPost.title,
                    content: mockNewPost.content,
                    authorId: mockNewPost.authorId,
                    visibility: mockNewPost.visibility,
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
                visibility: mockNewPost.visibility,
                thumbnail: mockNewPost.thumbnail,
                categories: mockNewPost.categories
            })).rejects.toThrow('Database error')
        })
    })

    describe('getPostById', () => {
        test('should get a post by id', async () => {
            mockCtx.prisma.post.findUnique.mockResolvedValue(mockNewPost)
            const result = await postService.getPostById(mockNewPost.id)
            expect(mockCtx.prisma.post.findUnique).toHaveBeenCalledWith({
                where: { id: mockNewPost.id },
                include: {
                    author: true,
                    likes: true,
                    comments: {
                        orderBy: { createdAt: 'desc' },
                        include: {
                            user: true
                        }
                    },
                    categories: true
                }
            })
            expect(result).toEqual(mockNewPost)
        })

        test('should throw an error if post is not found', async () => {
            mockCtx.prisma.post.findUnique.mockResolvedValue(null)
            await expect(postService.getPostById(mockNewPost.id)).rejects.toThrow('Post not found')
        })
    })

    describe('getPosts', () => {
        test('should get all posts', async () => {
            mockCtx.prisma.post.findMany.mockResolvedValue([mockNewPost])
            const result = await postService.getPosts()
            expect(mockCtx.prisma.post.findMany).toHaveBeenCalledWith({})
            expect(result).toEqual([mockNewPost])
        })
    })

    describe.only('getFeedByUserId', () => {

        const mockPostWithRelations = {
            ...mockNewPost,
            author: {
                id: 'user-1',
                name: 'John Doe'
            },
            likes: [],
            comments: [],
            categories: [
                { id: '1', name: 'tech' },
                { id: '2', name: 'programming' }
            ]
        }
    
        beforeEach(() => {
            jest.clearAllMocks(); // Reset mocks before each test
        });
    
        test.only('should get feed without filters', async () => {

            const mockFriends = [
                {
                    id: 'friendship-id-1',
                    userAId: 'user-id',
                    userA: {
                        id: 'user-id'
                    },
                    userBId: 'friend-1',
                    userB: {
                        id: 'friend-1'
                    },
                    status: 'ACCEPTED' as FriendshipStatus
                },
                {
                    id: 'friendship-id-2',
                    userAId: 'user-id',
                    userA: {
                        id: 'user-id'
                    },
                    userBId: 'friend-2',
                    userB: {
                        id: 'friend-2'
                    },
                    status: 'ACCEPTED' as FriendshipStatus
                }
            ];

            const expectedWhereClause = {
                AND: [{}, {}],
                authorId: { in: ['friend-1', 'friend-2', 'user-id'] },
                visibility: undefined
            };
    
            mockCtx.prisma.post.count.mockResolvedValue(1);
            mockCtx.prisma.post.findMany.mockResolvedValue([mockPostWithRelations]);
    
            // Mock friendship service
            mockCtx.prisma.friendship.findMany.mockResolvedValue(mockFriends)

            const result = await postService.getFeedByUserId('user-id', { orderBy: 'asc' }, {});
            expect(mockCtx.prisma.post.findMany).toHaveBeenCalledWith({
                where: expectedWhereClause,
                orderBy: { createdAt: 'asc' },
                skip: undefined,
                take: 10,
                include: {
                    author: true,
                    likes: true,
                    comments: true,
                    categories: true,
                }
            });
            expect(mockCtx.prisma.post.count).toHaveBeenCalledWith({ where: expectedWhereClause });
            expect(result).toEqual({
                posts: [mockPostWithRelations],
                totalCount: 1,
                totalPages: 1
            });
        });

        // test('should filter by search string in title and content', async () => {
        //     mockCtx.prisma.post.findMany.mockResolvedValue([mockPostWithRelations])
        //     const result = await postService.getFeedByUserId('user-id', {
        //         searchString: 'test'
        //     })
        //     expect(mockCtx.prisma.post.findMany).toHaveBeenCalledWith({
        //         where: {
        //             AND: [
        //                 {
        //                     OR: [
        //                         { title: { contains: 'test', mode: 'insensitive' } },
        //                         { content: { contains: 'test', mode: 'insensitive' } }
        //                     ]
        //                 },
        //                 {}
        //             ]
        //         },
        //         orderBy: { createdAt: undefined },
        //         include: {
        //             author: true,
        //             likes: true,
        //             comments: true,
        //             categories: true,
        //         }
        //     })
        //     expect(result).toEqual([mockPostWithRelations])
        // })

        // test('should filter by category', async () => {
        //     mockCtx.prisma.post.findMany.mockResolvedValue([mockPostWithRelations])
        //     const result = await postService.getFeedByUserId('user-id', {
        //         category: 'tech'
        //     })
        //     expect(mockCtx.prisma.post.findMany).toHaveBeenCalledWith({
        //         where: {
        //             AND: [
        //                 {},
        //                 {
        //                     categories: {
        //                         some: {
        //                             name: {
        //                                 equals: 'tech',
        //                                 mode: 'insensitive'
        //                             }
        //                         }
        //                     }
        //                 }
        //             ]
        //         },
        //         orderBy: { createdAt: undefined },
        //         include: {
        //             author: true,
        //             likes: true,
        //             comments: true,
        //             categories: true,
        //         }
        //     })
        //     expect(result).toEqual([mockPostWithRelations])
        // })

        // test('should apply both search string and category filters', async () => {
        //     mockCtx.prisma.post.findMany.mockResolvedValue([mockPostWithRelations])
        //     const result = await postService.getFeedByUserId('user-id', {
        //         searchString: 'test',
        //         category: 'tech'
        //     })
        //     expect(mockCtx.prisma.post.findMany).toHaveBeenCalledWith({
        //         where: {
        //             AND: [
        //                 {
        //                     OR: [
        //                         { title: { contains: 'test', mode: 'insensitive' } },
        //                         { content: { contains: 'test', mode: 'insensitive' } }
        //                     ]
        //                 },
        //                 {
        //                     categories: {
        //                         some: {
        //                             name: {
        //                                 equals: 'tech',
        //                                 mode: 'insensitive'
        //                             }
        //                         }
        //                     }
        //                 }
        //             ]
        //         },
        //         orderBy: { createdAt: undefined },
        //         include: {
        //             author: true,
        //             likes: true,
        //             comments: true,
        //             categories: true,
        //         }
        //     })
        //     expect(result).toEqual([mockPostWithRelations])
        // })

        // test('should order results by createdAt', async () => {
        //     mockCtx.prisma.post.findMany.mockResolvedValue([mockPostWithRelations])
        //     const result = await postService.getFeedByUserId(authorId, {}, {
        //         orderBy: 'desc'
        //     })
        //     expect(mockCtx.prisma.post.findMany).toHaveBeenCalledWith({
        //         where: {
        //             AND: [{}, {}]
        //         },
        //         orderBy: { createdAt: 'desc' },
        //         include: {
        //             author: true,
        //             likes: true,
        //             comments: true,
        //             categories: true,
        //         }
        //     })
        //     expect(result).toEqual([mockPostWithRelations])
        // })

        // test('should handle empty result', async () => {
        //     mockCtx.prisma.post.findMany.mockResolvedValue([])
        //     const result = await postService.getFeedByUserId('user-id')
        //     expect(result).toEqual([])
        // })

        // test('should handle database errors', async () => {
        //     const error = new Error('Database error')
        //     mockCtx.prisma.post.findMany.mockRejectedValue(error)
        //     await expect(postService.getFeedByUserId('user-id')).rejects.toThrow('Database error')
        // })
    })
})
