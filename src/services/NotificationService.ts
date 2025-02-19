import { Context } from "@/lib/prisma/context";

type createNotificationDTO = {
    type: "LIKE" | "COMMENT" | "FRIEND_REQUEST" | undefined | null, // TODO: Remove undefined and null
    content: string,
    userId: string,
    actorId: string,
    entityId?: string,
    entityType?: "POST" | "COMMENT" | "USER" | undefined | null, // TODO: Remove undefined and null
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
                read
            }
        })
    }

    async getNotifications(userId: string) {
        return this.context.prisma.notification.findMany({
            where: {
                userId
            }
        })
    }

}