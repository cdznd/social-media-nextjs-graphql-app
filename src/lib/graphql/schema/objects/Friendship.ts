import { objectType } from "nexus";
import { User } from "./Auth";

export const Friendship = objectType({
    name: "Friendship",
    definition(t) {
        t.string("id");
        t.field("userA", { type: User });
        t.field("userB", { type: User });
        t.string("status")
    }
})