import { PrismaClient } from "@prisma/client";

export class UserService {

    constructor(
        private prisma: PrismaClient
    ) {}

    async getUserById(userId: string) {
        return this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    }

}