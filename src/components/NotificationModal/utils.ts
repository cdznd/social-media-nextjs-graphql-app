import { NotificationType } from "@/types/notification"

// Split notifications between friend requests and common notifications
export const orderNotifications = (userNotifications: NotificationType[]) => {
    return userNotifications.reduce((acc: {
        friendshipNotifications: NotificationType[],
        commonNotifications: NotificationType[]
    }, current: NotificationType) => {
        if (current.type === 'FRIEND_REQUEST') {
            acc.friendshipNotifications?.push(current)
        } else {
            acc.commonNotifications?.push(current)
        }
        return acc
    }, {
        friendshipNotifications: [],
        commonNotifications: []
    })
}