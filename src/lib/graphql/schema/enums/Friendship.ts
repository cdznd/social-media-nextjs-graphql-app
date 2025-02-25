import { enumType } from "nexus";

export const FriendshipStatus = enumType({
    name: "FriendshipStatus",
    members: ["PENDING", "ACCEPTED", "REJECTED"],
});