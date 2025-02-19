import { Context } from "@/lib/prisma/context"

type createFriendshipRequestDTO = {
    fromUserId: string
    toUserId: string
}

export default class FriendshipService {

    constructor(
        private context: Context
    ) { }

    async createFriendship({ fromUserId, toUserId }: createFriendshipRequestDTO) {
        return this.context.prisma.friendship.create({
            data: {
                userA: {
                    connect: { id: fromUserId }
                },
                userB: {
                    connect: { id: toUserId }
                },
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

    async getFriendship(fromUserId: string, toUserId: string) {
        return this.context.prisma.friendship.findFirst({
            where: {
                OR: [
                    {
                        AND: [
                            { userAId: fromUserId },
                            { userBId: toUserId }
                        ]
                    },
                    {
                        AND: [
                            { userAId: toUserId },
                            { userBId: fromUserId }
                        ]
                    }
                ]
            },
            include: {
                userA: true,
                userB: true
            }
        })
    }

    async updateFriendshipStatus(
        { friendshipId, status }: { friendshipId: string, status?: "PENDING" | "ACCEPTED" | "REJECTED" }
    ) {
        return this.context.prisma.friendship.update({
            where: {
                id: friendshipId
            },
            data: {
                status
            }
        })
    }

    async deleteFriendship(friendshipId: string) {
        return this.context.prisma.friendship.delete({
            where: {
                id: friendshipId
            }
        })
    }

}