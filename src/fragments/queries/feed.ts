import gql from "graphql-tag";

import {
  POST_FIELDS,
  POST_LIKES,
  POST_AUTHOR,
  POST_CATEGORIES
} from "./post";

export const GET_PRIVATE_FEED_POSTS = gql`
  query FeedPosts(
    $userId: String!,
    $searchString: String,
    $category: String,
    $visibility: String,
    $take: Int,
    $skip: Int,
  ) {
    privateFeedPosts(
      userId: $userId,
      searchString: $searchString,
      category: $category,
      visibility: $visibility,
      take: $take,
      skip: $skip,
    ) {
      posts {
        ...PostFields
        ...PostLikes
        ...PostAuthor
        ...PostCategories
      }
      totalCount
      totalPages
    }
  }
  ${POST_FIELDS}
  ${POST_LIKES}
  ${POST_AUTHOR}
  ${POST_CATEGORIES}
`;

export const GET_EXPLORE_FEED_POSTS = gql`
  query exploreFeedPosts(
    $searchString: String,
    $category: String,
    $take: Int,
    $skip: Int,
  ) {
    exploreFeedPosts(
      searchString: $searchString,
      category: $category,
      take: $take,
      skip: $skip,
    ) {
      posts {
        ...PostFields
        ...PostLikes
        ...PostAuthor
        ...PostCategories
      }
      totalCount
      totalPages
    }
  }
  ${POST_FIELDS}
  ${POST_LIKES}
  ${POST_AUTHOR}
  ${POST_CATEGORIES}
`;

export const GET_PRIVATE_PROFILE_FEED_POSTS = gql`
  query FeedPosts(
    $userId: String!,
    $searchString: String,
    $category: String,
    $visibility: String,
    $take: Int,
    $skip: Int,
  ) {
    privateProfileFeed(
      userId: $userId,
      searchString: $searchString,
      category: $category,
      visibility: $visibility,
      take: $take,
      skip: $skip,
    ) {
      posts {
        ...PostFields
        ...PostLikes
        ...PostAuthor
        ...PostCategories
      }
      totalCount
      totalPages
    }
  }
  ${POST_FIELDS}
  ${POST_LIKES}
  ${POST_AUTHOR}
  ${POST_CATEGORIES}
`;

export const GET_PRIVATE_PROFILE_FEED_INFO = gql`
  query PrivateProfileFeedInfo($userId: String!) {
    privateProfileFeedInfo(userId: $userId) {
      privatePostsCount
      publicPostsCount
    }
  }
`;