import {
    extendType,
    nonNull,
    stringArg,
    booleanArg,
    arg
} from "nexus"

import { Context } from "@/lib/prisma/context"
import { Notification } from "../types/Notification"
import { NotificationType } from "../enums"
import NotificationService from "@/services/NotificationService"

export const NotificationMutations = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createNotification', {
            type: Notification,
            args: {
                type: nonNull(arg({ type: NotificationType })),
                content: nonNull(stringArg()),
                userId: nonNull(stringArg()),
                actorId: nonNull(stringArg()),
                entityId: nonNull(stringArg()),
                entityType: nonNull(arg({ type: 'NotificationEntityType' })),
                read: nonNull(booleanArg({ default: false }))
            },
            resolve: async (_parent, args, context: Context) => {
                const { type, content, userId, actorId, entityId, entityType, read } = args
                const notificationService = new NotificationService(context)
                return notificationService.createNotification({
                    type,
                    content,
                    userId,
                    actorId,
                    entityId,
                    entityType,
                    read
                })
            }
        })
        t.field('updateNotificationReadStatus', {
            type: Notification,
            args: {
                notificationId: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const { notificationId } = args
                const notificationService = new NotificationService(context)
                return notificationService.updateNotificationReadStatus(notificationId)
            }
        })
        t.field(
            'deleteNotification',
            {
                type: Notification,
                args: {
                    notificationId: nonNull(stringArg())
                },
                resolve: async (_parent, args, context: Context) => {
                    const { notificationId } = args
                    const notificationService = new NotificationService(context)
                    return notificationService.deleteNotification(notificationId)
                }
            }
        )
    }
})