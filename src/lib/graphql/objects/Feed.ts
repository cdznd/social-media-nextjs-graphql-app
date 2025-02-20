import { objectType } from "nexus";

import { Post } from "./Post";

export const PrivateFeedResponse = objectType({
    name: 'PrivateFeedResponse',
    definition(t) {
        t.nonNull.list.nonNull.field('posts', { type: Post });
        t.nonNull.int('totalCount');
        t.nonNull.int('totalPages');
    },
});