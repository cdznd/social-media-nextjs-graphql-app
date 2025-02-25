import { objectType } from "nexus";

import { User } from "./Auth";
import { Post } from "./Post";

export const Comment = objectType({
    name: "Comment",
    definition(t) {
        t.id("id");
        t.string("content");
        t.string("userId");
        t.string("postId");
        t.field("user", { type: User });
        t.field("post", { type: Post });
        t.nonNull.field("createdAt", { type: "DateTime" });
        t.nonNull.field("updatedAt", { type: "DateTime" });
    },
});