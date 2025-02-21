export type PostData = {
    id: string;
    title: string;
    content: string;
    thumbnail?: string | null,
    authorId: string;
    visibility: string;
    author: {
        id: string;
        name: string;
        image: string;
    }
    likes: {
        id: string;
        userId: string
        postId: string;
    }[];
    comments: {
        id: string;
        content: string;
        authorId: string;
    }[];
    categories: {
        id: string;
        name: string;
    }[];
    createdAt: string;
    updatedAt: string;
}

type CreatePostDTO = {
    title: string
    content: string
    authorId: string
    thumbnail?: string | null
    categories: string[]
}

type FeedSortByOrder = 'asc' | 'desc';

export type FeedOptions = {
    orderBy: FeedSortByOrder,
    skip?: number,
    take?: number
}

export type FeedFilters = {
    searchString?: string
    category?: string
}

export type PostWhereInput = {
    AND?: Array<{
        OR?: Array<{
            title?: { contains: string; mode: 'insensitive' };
            content?: { contains: string; mode: 'insensitive' };
        }>;
        categories?: { some: { name: { equals: string; mode: 'insensitive' } } };
    }>;
    authorId?: { in: Array<string> };
    visibility?: 'PUBLIC' | 'PRIVATE';
}
