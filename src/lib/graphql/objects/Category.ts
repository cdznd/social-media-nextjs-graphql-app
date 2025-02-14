import { objectType } from "nexus";
import { Post } from "./Post";

export const Category = objectType({
    name: "Category",
    definition(t) {
        t.id("id");
        t.string("name");
        t.nonNull.list.nonNull.field("posts", {
            type: Post,
            resolve: (_parent) => _parent.posts ?? []
        });
    },
});