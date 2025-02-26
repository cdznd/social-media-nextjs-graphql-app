import { objectType } from "nexus";
import { User } from "./Auth";

export const DefaultUserListResponse = objectType({
    name: 'DefaultUserListResponse',
    definition(t) {
        t.nonNull.list.nonNull.field('users', { type: User })
        t.nonNull.int('totalCount')
        t.nonNull.int('totalPages')
    }
})