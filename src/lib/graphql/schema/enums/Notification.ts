import { enumType } from "nexus"

export const NotificationType = enumType({
    name: "NotificationType",
    members: ["FRIEND_REQUEST", "FRIEND_REQUEST_RESPONSE", "LIKE", "COMMENT"]
})

export const NotificationEntityType = enumType({
    name: "NotificationEntityType",
    members: ["POST", "COMMENT", "FRIENDSHIP"]
})