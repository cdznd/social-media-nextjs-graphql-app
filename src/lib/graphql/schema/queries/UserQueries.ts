import {
    extendType,
    nonNull,
    stringArg,
    intArg
} from "nexus";

import { Context } from "@/lib/prisma/context";
import { User } from "../types/Auth"
import UserService from "@/services/UserService"
import { DefaultUserListResponse } from "../types/User";

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
        t.nonNull.field(
            'allUsers',
            {
                type: DefaultUserListResponse,
                args: {
                    skip: intArg(),
                    take: intArg()
                },
                resolve: async (_parent, args, context: Context) => {
                    const { take, skip } = args
                    const userService = new UserService(context)
                    const { users, totalCount, totalPages } = await userService.getUsers({
                        take: take ?? undefined,
                        skip: skip ?? undefined
                    })
                    return { users, totalCount, totalPages }
                }
            }
        )
    }
})