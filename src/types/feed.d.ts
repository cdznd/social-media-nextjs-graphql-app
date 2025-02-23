import { PostType } from "./post"

export type FeedProps = {
  feedData: PostType[]
  feedType: string
  totalPages: number
}

export type FeedTypeProps = {
  posts: PostType[]
}

export type SearchParamsProps = {
    searchParams: {
      page?: number,
      search?: string,
      category?: string
    }
}