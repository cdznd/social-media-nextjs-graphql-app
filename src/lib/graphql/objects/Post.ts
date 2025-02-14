import { objectType } from "nexus";

import { User } from "./Auth";
import { Like } from "./Like";
import { Comment } from "./Comment";
import { Category } from "./Category";

export const Post = objectType({
    name: "Post",
    definition(t) {
        t.id("id");
        t.string("title");
        t.string("content");
        t.nullable.string("thumbnail");
        t.string("authorId");
        t.field("author", { type: User });
        t.list.nonNull.field("likes", {
            type: Like,
            resolve: (_parent) => _parent.likes ?? []
        });
        t.nonNull.list.nonNull.field("comments", {
            type: Comment,
            resolve: (_parent) => _parent.comments ?? []
        });
        t.nonNull.list.nonNull.field("categories", {
            type: Category,
            resolve: (_parent) => _parent.categories ?? []
        });
        t.nonNull.field("createdAt", { type: "DateTime" });
        t.nonNull.field("updatedAt", { type: "DateTime" });
    },
});