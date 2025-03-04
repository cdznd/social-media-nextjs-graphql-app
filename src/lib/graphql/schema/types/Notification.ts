import { objectType } from "nexus"
import { User } from "./Auth"
import { NotificationType, NotificationEntityType } from "../enums"

export const Notification = objectType({
    name: 'Notification',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('type', { type: NotificationType });
        t.nonNull.string('content');
        t.nonNull.string('userId');
        t.field('user', { type: User });
        t.nonNull.string('actorId');
        t.field('actor', { type: User });
        t.string('entityId');
        t.nonNull.field('entityType', { type: NotificationEntityType });
        t.nonNull.boolean('read');
        t.nonNull.field('createdAt', { type: 'DateTime' });
        t.nonNull.field('updatedAt', { type: 'DateTime' });
        t.field('expiresAt', { type: 'DateTime' });
    }
})