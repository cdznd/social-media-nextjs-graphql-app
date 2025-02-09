import gql from "graphql-tag";

export const CREATE_POST_MUTATION = gql`
    mutation CreatePost(
        $title: String!,
        $content: String!,
        $authorId: String!,
        $thumbnail: String,
        $categories: [String!]!
    ) {
        createPost(
            title: $title,
            content: $content,
            authorId: $authorId,
            thumbnail: $thumbnail,
            categories: $categories
        ) {
            id
        }
    }
`;

//   query FeedPosts(
//     $userId: String!,
//     $searchString: String,
//   ) {
//     feedPosts(
//       userId: $userId,
//       searchString: $searchString  
//     ) {
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
//       categories {
//         name
//       }
//     }
//   }
// `;

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