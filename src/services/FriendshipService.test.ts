import { Context } from "@/lib/prisma/context"
import { MockContext, createMockContext } from '../lib/prisma/tests/PrismaContextUtils'
import FriendshipService from './FriendshipService'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})

// TODO: Find a way to mock the include option from findMany, 
// because typescript is not allowing to mock the user object
test('Should return friends list for a given user', async () => {
    const userId = 'user-123'
    mockCtx.prisma.friendship.findMany.mockResolvedValue([
        {
            id: 'friendship-1',
            userAId: userId,
            userBId: 'user-456',
            status: 'PENDING'
        },
        {
            id: 'friendship-2',
            userAId: 'user-789',
            userBId: userId,
            status: 'PENDING'
        }
    ])
    const friendshipService = new FriendshipService(ctx)
    await expect(friendshipService.getFriendsByUserId(userId)).resolves.toEqual([
        {
            id: 'friendship-1',
            userAId: userId,
            userBId: 'user-456',
            status: 'PENDING'
        },
        {
            id: 'friendship-2',
            userAId: 'user-789',
            userBId: userId,
            status: 'PENDING'
        }
    ])
})