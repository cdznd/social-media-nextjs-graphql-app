import { objectType } from "nexus";
import { User } from "./Auth";

export const Friendship = objectType({
    name: "Friendship",
    definition(t) {
        t.string("id");
        t.nonNull.field("userA", { type: User });
        t.nonNull.field("userB", { type: User });
        t.string("status")
    }
})