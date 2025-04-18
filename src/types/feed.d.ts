import { PostType } from "./post"

export type FeedProps = {
  feedData: PostType[]
  feedType: string
  totalPages: number
  numberOfPosts: number
}

export type FeedTypeProps = {
  posts: PostType[]
}

export type SearchParamsProps = Promise<{
  page?: number
  search?: string
  category?: string
  visibility?: string
}>

export type FeedHeaderProps = {
  numberOfPosts: number,
  feedType: string
}