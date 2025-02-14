import { Context } from "@/lib/prisma/context"
import { MockContext, createMockContext } from '../lib/tests/PrismaContextUtils'
import { FriendshipService } from './FriendshipService'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})