import { Context } from "@/lib/prisma";

export class CategoryService {

    constructor(
        private context: Context
    ) {}

    async getCategories() {
        return this.context.prisma.category.findMany({})
    }

}