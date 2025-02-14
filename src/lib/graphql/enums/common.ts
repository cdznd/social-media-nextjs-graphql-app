import { enumType } from 'nexus'

export const SortOrder = enumType({
    name: "SortOrder",
    members: ["asc", "desc"],
});

export const FriendshipStatus = enumType({
    name: "FriendshipStatus",
    members: ["PENDING", "ACCEPTED", "REJECTED"],
});