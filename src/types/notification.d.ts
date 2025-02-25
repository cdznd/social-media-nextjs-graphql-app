import { UserType } from "./user";

export type NotificationType = {
    id: string;
    type: FRIEND_REQUEST | FRIEND_REQUEST_RESPONSE | LIKE | COMMENT;
    content: string;
    userId: string;
    actorId: string;
    actor: UserType;
    entityId: string;
    entityType: POST | COMMENT | FRIENDSHIP;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
}