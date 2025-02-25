import { Context } from "@/lib/prisma/context"
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
    ) {}

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
                        author: true // TODO: Why including author again? if the userId is the author
                    }
                },
                likes: {
                    include: {
                        post: true
                    }
                },
                notificationsSent: true,
                notificationsReceived: true
            }
        })
        if(!result) {
            throw new Error('User not found')
        }
        return result
    }

    async getUsers() {
        const result = this.context.prisma.user.findMany({
            include: {
                accounts: true
            }
        })
        if(!result) {
            throw new Error('Users not found')
        }
        return result
    }

}