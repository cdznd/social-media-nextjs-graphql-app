import { Context } from "@/lib/prisma/context"

export default class CategoryService {

    constructor(
        private context: Context
    ) {}

    async createCategory(name: string) {
        return this.context.prisma.category.create({
            data: {
                name
            }
        })
    }

    async getCategories() {
        return this.context.prisma.category.findMany({})
    }

}