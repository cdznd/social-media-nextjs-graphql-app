import { objectType } from "nexus"
import { User } from "./Auth"
import { NotificationType } from "../enums"

export const Notification = objectType({
    name: 'Notification',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('type', { type: NotificationType });
        t.nonNull.string('content');
        t.nonNull.string('userId');
        t.nonNull.field('user', { type: User });
        t.nonNull.string('actorId');
        t.nonNull.field('actor', { type: User });
        t.string('entityId');
        t.nonNull.string('entityType');
        t.nonNull.boolean('read');
        t.nonNull.field('createdAt', { type: 'DateTime' });
        t.nonNull.field('updatedAt', { type: 'DateTime' });
        t.nonNull.field('expiresAt', { type: 'DateTime' });
    }
})