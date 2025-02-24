import { UserType } from "./user"

export type FriendshipType = {
    id: String
    status: String
    userA: UserType
    userB: UserType
}