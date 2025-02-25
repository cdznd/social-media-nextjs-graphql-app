import {
    extendType,
    nonNull,
    stringArg
} from "nexus"

import { Context } from "@/lib/prisma/context"
import { Category } from "../types/Category"
import CategoryService from "@/services/CategoryService"

export const CategoryMutations = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createCategory', {
            type: Category,
            args: {
                name: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const { name } = args
                const categoryService = new CategoryService(context)
                return categoryService.createCategory(name)
            }
        })
    }
})