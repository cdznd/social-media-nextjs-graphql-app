import gql from "graphql-tag";

export const GET_FEED_POSTS = gql`
  query FeedPosts(
    $userId: String!,
    $searchString: String,
    $category: String,
  ) {
    feedPosts(
      userId: $userId,
      searchString: $searchString,
      category: $category
    ) {
      id
      title
      content
      createdAt
      thumbnail
      likes {
        id
        userId
      }
      author {
        id
        name
        image
      }
      categories {
        id
        name
      }
    }
  }
`;