import {
    extendType,
    nonNull,
    stringArg
} from "nexus";

import { Context } from "@/lib/prisma/context";
import { Category } from "../types/Category";
import CategoryService from "@/services/CategoryService";

export const CategoryQueries = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('categories', {
            type: Category,
            resolve: async (_parent, args, context: Context) => {
                const categoryService = new CategoryService(context)
                return categoryService.getCategories()
            }
        })
    }
})