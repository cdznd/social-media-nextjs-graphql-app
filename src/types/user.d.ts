export type UserType = {
    id: string
    name: string
    email: string
    image: string
    username: string
}

export type UserOptions = {
    skip?: number,
    take?: number
}

export type UserFilters = {
    searchString?: string
}

import { QueryMode } from "@prisma/client";

export type UsersWhereInput = {
    name?: { contains: string; mode?: QueryMode }
};

export type UserProfileCardProps = {
    user: UserType
}
  