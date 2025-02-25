import { Prisma } from "@prisma/client";
import { Context } from "@/lib/prisma/context";

type createNotificationDTO = {
    type: "LIKE" | "COMMENT" | "FRIEND_REQUEST" | "FRIEND_REQUEST_RESPONSE" | undefined | null, // TODO: Remove undefined and null
    content: string,
    userId: string,
    actorId: string,
    entityId?: string,
    entityType?: "POST" | "COMMENT" | "FRIENDSHIP" | undefined | null, // TODO: Remove undefined and null
    read?: boolean,
}

export default class NotificationService {

    constructor(
        private context: Context
    ) { }

    async createNotification({ type, content, userId, actorId, entityId, entityType, read }: createNotificationDTO) {
        return this.context.prisma.notification.create({
            data: {
                type,
                content,
                userId,
                actorId,
                entityId,
                entityType,
                read: false
            }
        })
    }

    async getNotifications(userId: string) {
        return this.context.prisma.notification.findMany({
            where: {
                userId,
                read: false
            },
            include: {
                user: true,
                actor: true
            }
        })
    }

    async getReadNotifications(userId: string) {
        return this.context.prisma.notification.findMany({
            where: {
                userId,
                read: true
            },
            include: {
                user: true,
                actor: true
            }
        })
    }
    
    async deleteNotification(notificationId: string) {
        return this.context.prisma.notification.delete({
            where: {
                id: notificationId,
            }
        })
    }

    async deleteFriendRequestNotification(entityId: string) {
        const currentFRNotification = await this.context.prisma.notification.findFirst({
            where: {
                entityType: 'FRIENDSHIP',
                entityId
            }
        })
        if (!currentFRNotification) return
        return this.context.prisma.notification.delete({
            where: {
                id: currentFRNotification.id
            }
        })
    }

    async updateNotificationReadStatus(notificationId: string) {
        return this.context.prisma.notification.update({
            where: {
                id: notificationId
            },
            data: {
                read: true
            }
        })
    }

}