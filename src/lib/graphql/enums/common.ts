import { enumType } from 'nexus'

export const SortOrder = enumType({
    name: "SortOrder",
    members: ["asc", "desc"],
});

export const FriendshipStatus = enumType({
    name: "FriendshipStatus",
    members: ["PENDING", "ACCEPTED", "REJECTED"],
});

export const NotificationType = enumType({
    name: "NotificationType",
    members: ["LIKE", "COMMENT", "FRIEND_REQUEST"]
})

export const NotificationEntityType = enumType({
    name: "NotificationEntityType",
    members: ["POST", "COMMENT", "FRIENDSHIP"]
})