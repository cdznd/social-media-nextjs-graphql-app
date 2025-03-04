import { Context } from "@/lib/prisma/context"
import { UserOptions, UserFilters, UsersWhereInput } from "@/types/user"
import { hash } from "bcrypt"

type createUserDTO = {
    name: string
    email: string
    password: string
    username: string
    image?: string | null
}

export default class UserService {

    constructor(
        private context: Context
    ) { }

    async createUser({ name, email, password, username, image }: createUserDTO) {
        return this.context.prisma.user.create({
            data: {
                name,
                email,
                password: password ? await hash(password, 10) : undefined,
                username,
                image
            }
        })
    }

    async getUserById(userId: string) {
        const result = this.context.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                posts: {
                    include: {
                        categories: true,
                        comments: true,
                        likes: true
                    }
                },
                likes: {
                    include: {
                        post: {
                            include: {
                                categories: true,
                                comments: true,
                                likes: true
                            }
                        }
                    }
                },
                // comments: {
                //     include: {
                //         post: {
                //             include: {
                //                 categories: true,
                //                 comments: true,
                //                 likes: true
                //             }
                //         }
                //     }
                // },
                notificationsSent: true,
                notificationsReceived: true
            }
        })
        if (!result) {
            throw new Error('User not found')
        }
        return result
    }

    async getUsers(options: UserOptions, filters: UserFilters) {
        const { take = 10, skip } = options
        const { searchString } = filters
        const where: UsersWhereInput = searchString ? {
            name: { contains: searchString, mode: 'insensitive' }
        } : {}
        const totalCount = await this.context.prisma.user.count({ where })
        const totalPages = Math.ceil(totalCount / take)
        const users = await this.context.prisma.user.findMany({
            where,
            include: {
                accounts: true
            },
            take,
            skip,
        })
        return { users, totalCount, totalPages }
    }

}