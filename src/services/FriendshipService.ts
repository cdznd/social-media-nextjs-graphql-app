import { Context } from "@/lib/prisma/context"

export class FriendshipService {

    constructor(
        private context: Context
    ){}

    async getFriendsByUserId(userId: string) {
        return this.context.prisma.friendship.findMany({
            where: {
                OR: [
                    { userAId: userId },
                    { userBId: userId }
                ]
            },
            include: {
                userA: true,
                userB: true
            }
        })
    }

}