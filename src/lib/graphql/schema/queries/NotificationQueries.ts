import { extendType, nonNull, stringArg } from "nexus";

import { Context } from '../../../prisma/context';
import { Notification } from '../types/Notification';
import NotificationService from "@/services/NotificationService";

export const NotificationQueries = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('notifications', {
            type: Notification,
            args: {
                userId: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const { userId } = args
                const notificationService = new NotificationService(context)
                return notificationService.getNotifications(userId)
            }
        })
        t.nonNull.list.nonNull.field('readNotifications', {
            type: Notification,
            args: {
                userId: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const { userId } = args
                const notificationService = new NotificationService(context)
                return notificationService.getReadNotifications(userId)
            }
        })      
    }
})