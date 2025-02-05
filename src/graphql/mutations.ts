import gql from "graphql-tag";

export const CREATE_POST_MUTATION = gql`
    mutation CreatePostMutation(
        $title: String!,
        $content: String!,
        $authorId: String!
        $thumbnail: String
    ) {
        createPost(
            title: $title,
            content: $content,
            authorId: $authorId,
            thumbnail: $thumbnail
        ) {
            id,
            title,
            content
        }
    }
`;

export const GET_FEED_POSTS = gql`
  query FeedPosts(
    $userId: ID!,
    $search: String,
  ) {
    posts(
      userId: $userId,
      search: $search  
    ) {
      id
      title
      content
      createdAt
      thumbnail
      likes {
        user {
          id
          name
          image
        }
      }
      author {
        id
        image
        name
      }
    }
  }
`;

// export const GET_FEED_POSTS_USER = gql`
//   query FeedPosts($userId: ID!) {
//     posts(userId: $userId) {
//       id
//       title
//       content
//       createdAt
//       thumbnail
//       likes {
//         user {
//           id
//           name
//           image
//         }
//       }
//       author {
//         id
//         image
//         name
//       }
//     }
//   }
// `;