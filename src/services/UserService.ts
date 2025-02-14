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
        return this.context.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                posts: {
                    include: {
                        author: true
                    }
                }
            }
        })
    }

    async getUsers() {
        return this.context.prisma.user.findMany({
            include: {
                accounts: true
            }
        })
    }

}