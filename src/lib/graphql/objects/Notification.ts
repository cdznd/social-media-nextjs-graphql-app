import { objectType } from "nexus"

export const Notification = objectType({
    name: 'Notification',
    definition(t) {
        t.id('id');
        t.string('type');
        t.string('content');
        t.string('userId');
        t.string('actorId');
        t.string('entityId');
        t.string('entityType');
        t.boolean('read');
        t.field('createdAt', { type: 'DateTime' });
        t.field('updatedAt', { type: 'DateTime' });
        t.field('expiresAt', { type: 'DateTime' });
    }
})