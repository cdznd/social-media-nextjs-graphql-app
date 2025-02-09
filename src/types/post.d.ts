export type PostData = {
    id: string;
    title: string;
    content: string;
    thumbnail?: string | null,
    authorId: string;
    author: {
        id: string;
        name: string;
        image: string;
    }
    likes: {
        id: string;
        userId: string
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