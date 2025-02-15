import { Context } from "@/lib/prisma/context"
import { MockContext, createMockContext } from '../lib/prisma/tests/PrismaContextUtils'
import CategoryService from './CategoryService'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})

test('Should return categories list', async () => {
    mockCtx.prisma.category.findMany.mockResolvedValue(
        [
            {
                id: 'category-id-1',
                name: 'category-1'
            },
            {
                id: 'category-id-2',
                name: 'category-2'
            }
        ]
    )
    const categoryService = new CategoryService(ctx)
    await expect(categoryService.getCategories()).resolves.toEqual([
        {
            id: 'category-id-1',
            name: 'category-1'
        },
        {
            id: 'category-id-2',
            name: 'category-2'
        }
    ])
})