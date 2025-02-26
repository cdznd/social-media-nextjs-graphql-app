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