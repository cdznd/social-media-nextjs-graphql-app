import gql from "graphql-tag";

/*
  There will be two types of feed, one is the Explorer feed, that is a kind of public posts, and where 
  all users can see it. The other is user's feed, where we'll display only the user's friends posts that include the 
  friend's public and private posts (we'll mark on the post wether it's private or public post)
*/

export const GET_PRIVATE_FEED_POSTS = gql`
  query FeedPosts(
    $userId: String!,
    $searchString: String,
    $category: String,
    $take: Int,
    $skip: Int,
  ) {
    privateFeedPosts(
      userId: $userId,
      searchString: $searchString,
      category: $category,
      take: $take,
      skip: $skip,
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

export const GET_EXPLORE_FEED_POSTS = gql`
  query exploreFeedPosts(
    $searchString: String,
    $category: String,
  ) {
    exploreFeedPosts(
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