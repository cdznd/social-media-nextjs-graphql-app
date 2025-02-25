import { UserType } from "./user"

export type FriendshipType = {
    id: String
    status: String
    userA: UserType
    userB: UserType
}

export type FriendWithStatus = {
    user: UserType,
    status: 'ACCEPTED' | 'REJECTED' | 'PENDING'
}