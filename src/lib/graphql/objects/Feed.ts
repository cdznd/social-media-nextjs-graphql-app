import { objectType } from "nexus";

import { Post } from "./Post";

export const DefaultFeedResponse = objectType({
    name: 'DefaultFeedResponse',
    definition(t) {
        t.nonNull.list.nonNull.field('posts', { type: Post });
        t.nonNull.int('totalCount');
        t.nonNull.int('totalPages');
    },
});