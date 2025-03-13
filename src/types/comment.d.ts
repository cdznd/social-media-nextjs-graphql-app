import { UserType } from "./user";

export type CommentType = {
    id: string;
    content: string;
    user: UserType;
    createdAt: string;
}