import { objectType } from "nexus";
import { Post } from "./Post";

export const Category = objectType({
    name: "Category",
    definition(t) {
        t.id("id");
        t.string("name");
        t.list.nonNull.field("posts", { type: Post });
    },
});