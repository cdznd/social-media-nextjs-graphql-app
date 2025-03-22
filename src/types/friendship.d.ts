import { UserType } from "./user"

export type FriendshipType = {
    id: string
    status: string
    userA: UserType
    userB: UserType
}

export type ShortFriendshipType = {
    id: string,
    status: string,
    user: UserType
}

export type FriendshipStatus = 'ACCEPTED' | 'REJECTED' | 'PENDING'

export type FriendWithStatus = {
    user: UserType,
    status: FriendWithStatus
}