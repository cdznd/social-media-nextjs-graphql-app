import { Context } from "@/lib/prisma/context";
import { createNotificationDTO } from "@/types/notification";

export default class NotificationService {

    constructor(
        private context: Context
    ) { }

    async createNotification({ type, content, userId, actorId, entityId, entityType }: createNotificationDTO) {
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

    async deleteNotification(notificationId: string) {
        return this.context.prisma.notification.delete({
            where: {
                id: notificationId,
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

    // Deleted any friend_request or friend_request_response notification if exists
    async deleteFriendshipNotification(entityId: string) {
        const currentFriendshipNotification = await this.context.prisma.notification.findFirst({
            where: {
                entityType: 'FRIENDSHIP',
                entityId
            }
        })
        if (!currentFriendshipNotification) return
        return this.context.prisma.notification.delete({
            where: {
                id: currentFriendshipNotification.id
            }
        })
    }

}