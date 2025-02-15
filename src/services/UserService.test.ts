import { Context } from "@/lib/prisma/context"
import { MockContext, createMockContext } from '../lib/prisma/tests/PrismaContextUtils'
import UserService from "./UserService"
import { hash } from "bcrypt"

let mockCtx: MockContext
let ctx: Context
let userService: UserService

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('mocked-hash'),
}))

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
    userService = new UserService(ctx)
    jest.clearAllMocks()
})

describe('UserService', () => {

    const mockNewUser = {
        id: 'new-user-id',
        name: 'John Doe',
        email: 'johndoe@example.com',
        emailVerified: new Date(),
        password: 'password123',
        username: 'johndoe',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    describe('createUser', () => {
        test('should create a new user with hashed password', async () => {
            mockCtx.prisma.user.create.mockResolvedValue({
                ...mockNewUser,
                password: 'mocked-hash'
            })
            const result = await userService.createUser({
                name: mockNewUser.name,
                email: mockNewUser.email,
                password: mockNewUser.password,
                username: mockNewUser.username,
                image: mockNewUser.image
            })
            expect(hash).toHaveBeenCalledWith(mockNewUser.password, 10)
            expect(mockCtx.prisma.user.create).toHaveBeenCalledWith({
                data: {
                    name: mockNewUser.name,
                    email: mockNewUser.email,
                    password: 'mocked-hash',
                    username: mockNewUser.username,
                    image: mockNewUser.image
                }
            })
            expect(result).toEqual({
                ...mockNewUser,
                password: 'mocked-hash'
            })
        })
    })

    describe('getUserById', () => {
        test('should get a user by id', async () => {
            mockCtx.prisma.user.findUnique.mockResolvedValue(mockNewUser)
            const result = await userService.getUserById(mockNewUser.id)
            expect(mockCtx.prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: mockNewUser.id },
                include: {
                    posts: {
                        include: {
                            author: true
                        }
                    },
                }
            })
            expect(result).toEqual(mockNewUser)
        })
        // test('should throw an error if user is not found', async () => {
        //     mockCtx.prisma.user.findUnique.mockRejectedValue(null)
        //     await expect(userService.getUserById(mockNewUser.id)).rejects.toThrow('User not found')
        // })
    })

    describe('getUsers', () => {
        test('should get all users', async () => {
            mockCtx.prisma.user.findMany.mockResolvedValue([mockNewUser])
            const result = await userService.getUsers()
            expect(mockCtx.prisma.user.findMany).toHaveBeenCalledWith({
                include: {
                    accounts: true
                }
            })
            expect(result).toEqual([mockNewUser])
        })
    })

})
