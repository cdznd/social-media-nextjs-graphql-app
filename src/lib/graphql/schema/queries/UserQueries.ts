import {
    extendType,
    nonNull,
    stringArg,
    list
} from "nexus";

import { Context } from "@/lib/prisma/context";
import { User } from "../types/Auth"
import UserService from "@/services/UserService"

export const UserQueries = extendType({
    type: 'Query',
    definition(t) {
        t.nullable.field('user', {
            type: User,
            args: {
                userId: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const { userId } = args;
                const userService = new UserService(context)
                return userService.getUserById(userId)
            }
        })
        t.nonNull.list.nonNull.field('users', {
            type: User,
            resolve: async (_parent, args, context: Context) => {
                const userService = new UserService(context)
                return userService.getUsers()
            }
        })      
    }
})