import { Context } from "@/lib/prisma/context"

type createFriendshipDTO = {
    fromUserId: string
    toUserId: string
    status?: "PENDING" | "ACCEPTED" | "REJECTED" | null
}

export default class FriendshipService {

    constructor(
        private context: Context
    ){}

    async createFriendship( { fromUserId, toUserId, status }: createFriendshipDTO ) {
        return this.context.prisma.friendship.create({
            data: {
                userA: {
                    connect: { id: fromUserId }
                },
                userB: {
                    connect: { id: toUserId }
                },
                status: status ?? "PENDING"
            },
            include: {
                userA: true,
                userB: true
            }
        })
    }

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