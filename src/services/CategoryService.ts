import { Context } from "@/lib/prisma/context"

export default class CategoryService {

    constructor(
        private context: Context
    ) {}

    async getCategories() {
        return this.context.prisma.category.findMany({})
    }

}