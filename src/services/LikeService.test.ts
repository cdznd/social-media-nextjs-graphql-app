import { Context } from "@/lib/prisma/context"
import { MockContext, createMockContext } from '../lib/prisma/tests/PrismaContextUtils'
import LikeService from './LikeService'

let mockCtx: MockContext
let ctx: Context
let likeService: LikeService

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
    likeService = new LikeService(ctx)
})

describe('LikeService', () => {
    describe('triggerLike', () => {
        const userId = 'user-123'
        const postId = 'post-456'
        const mockLike = {
            id: 'like-1',
            userId,
            postId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        test('should create a new like when it does not exist', async () => {
            // Mocking a non existing like
            mockCtx.prisma.like.findUnique.mockResolvedValue(null)
            mockCtx.prisma.like.create.mockResolvedValue(mockLike)
            const result = await likeService.triggerLike({ userId, postId })
            expect(mockCtx.prisma.like.findUnique).toHaveBeenCalledWith({
                where: {
                    userId_postId: { userId, postId }
                }
            })
            expect(mockCtx.prisma.like.create).toHaveBeenCalledWith({
                data: { userId, postId }
            })
            expect(result).toEqual(mockLike)
        })
        test('should delete an existing like when it exists', async () => {
            // Mocking an existing like
            mockCtx.prisma.like.findUnique.mockResolvedValue(mockLike)
            mockCtx.prisma.like.delete.mockResolvedValue(mockLike)
            const result = await likeService.triggerLike({ userId, postId })
            expect(mockCtx.prisma.like.findUnique).toHaveBeenCalledWith({
                where: {
                    userId_postId: { userId, postId }
                }
            })
            expect(mockCtx.prisma.like.delete).toHaveBeenCalledWith({
                where: {
                    userId_postId: { userId, postId }
                }
            })
            expect(result).toEqual(mockLike)
        })
    })
})