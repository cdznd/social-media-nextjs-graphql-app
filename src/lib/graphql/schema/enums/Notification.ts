import { enumType } from "nexus"

export const NotificationType = enumType({
    name: "NotificationType",
    members: ["LIKE", "COMMENT", "FRIEND_REQUEST", "FRIEND_REQUEST_RESPONSE"]
})

export const NotificationEntityType = enumType({
    name: "NotificationEntityType",
    members: ["POST", "COMMENT", "FRIENDSHIP"]
})