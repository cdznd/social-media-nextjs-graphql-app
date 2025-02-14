import { Context } from "@/lib/prisma/context"

export default class UserService {

    constructor(
        private context: Context
    ) {}

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