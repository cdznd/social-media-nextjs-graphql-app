import {
    extendType,
} from "nexus";

import { Context } from "@apollo/client";
import { Like } from "../types/Like";

export const LikeQueries = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("likes", {
            type: Like,
            resolve: (parent, args, context: Context) => {
                return context.prisma.like.findMany({});
            },
        });
    },
})