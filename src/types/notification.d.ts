import { UserType } from "./user";

type NotificationTypes = "FRIEND_REQUEST" | "FRIEND_REQUEST_RESPONSE" | "LIKE" | "COMMENT";
type EntityTypes = "POST" | "COMMENT" | "FRIENDSHIP";

export type NotificationType = {
    id: string;
    type: NotificationTypes;
    content: string;
    userId: string;
    actorId: string;
    actor: UserType;
    entityId: string;
    entityType: EntityTypes;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
}

export type createNotificationDTO = {
    type: NotificationTypes;
    content: string;
    userId: string;
    actorId: string;
    entityId?: string;
    entityType: EntityTypes;
    read?: boolean;
}
