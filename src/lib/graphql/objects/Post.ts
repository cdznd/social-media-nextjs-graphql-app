import { objectType } from "nexus";

import { User } from "./Auth";
import { Like } from "./Like";
import { Comment } from "./Comment";
import { Category } from "./Category";
import { PostVisibilityType } from "../enums/common";

export const Post = objectType({
    name: "Post",
    definition(t) {
        t.id("id");
        t.string("title");
        t.string("content");
        t.nullable.string("thumbnail");
        t.string("authorId");
        t.field("author", { type: User });
        t.nonNull.field("visibility", { type: PostVisibilityType })
        t.list.nonNull.field("likes", { type: Like });
        t.nonNull.list.nonNull.field("comments", { type: Comment });
        t.nonNull.list.nonNull.field("categories", { type: Category });
        t.nonNull.field("createdAt", { type: "DateTime" });
        t.nonNull.field("updatedAt", { type: "DateTime" });
    },
});