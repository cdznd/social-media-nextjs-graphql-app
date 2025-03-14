import { CategoryType } from "./category";
import { LikeType } from "./like";
import { CommentType } from "./comment";

export type PostType = {
    id: string;
    title: string;
    content: string;
    thumbnail?: string | null;
    authorId: string;
    author: UserType;
    visibility: "PUBLIC" | "PRIVATE";
    likes: LikeType[];
    comments: CommentType[];
    categories: CategoryType[];
    createdAt: string;
    updatedAt: string;
};

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
    visibility?: string
}

export type PostWhereInput = {
    AND?: Array<{
        OR?: Array<{
            title?: { contains: string; mode: 'insensitive' };
            content?: { contains: string; mode: 'insensitive' };
        }>;
        categories?: { some: { name: { equals: string; mode: 'insensitive' } } };
    }>;
    authorId?: { in: Array<string> } | string;
    visibility?: 'PUBLIC' | 'PRIVATE';
}

type CreatePostDTO = {
    title: string,
    content: string,
    authorId: string,
    thumbnail: string,
    categories: string[]
};