export type FeedProps = {
  feedData: any
  feedType: string
  totalPages: number
}

export type SearchParamsProps = {
    searchParams: {
      page?: number,
      search?: string,
      category?: string
    }
}