import {
    extendType,
    nonNull,
    stringArg
} from "nexus"

import { Context } from "@/lib/prisma/context"
import { User } from '../types/Auth'
import UserService from "@/services/UserService"

export const UserMutations = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createUser', {
            type: User,
            args: {
                name: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
                username: nonNull(stringArg()),
                image: stringArg()
            },
            resolve: async (_parent, args, context: Context) => {
                const { name, email, password, username, image } = args
                const userService = new UserService(context)
                return userService.createUser({ name, email, password, username, image })
            }
        })
        t.field('updateUser', {
            type: User,
            args: {
                userId: nonNull(stringArg()),
                name: stringArg(),
                image: stringArg() 
            },
            resolve: async (_parent, args, context: Context) => {
                const { userId, name = null, image = null } = args
                const userService = new UserService(context)
                return userService.updateUser(userId, name, image)
            }
        })
    }
})