import gql from "graphql-tag";

export const CREATE_POST_MUTATION = gql`
    mutation CreatePostMutation(
        $title: String!,
        $content: String!,
        $authorId: String!
    ) {
        createPost(
            title: $title,
            content: $content,
            authorId: $authorId
        ) {
            id,
            title,
            content
        }
    }
`;

export const GET_FEED_POSTS = gql`
  query Posts {
    posts {
      id
      title
      content
      createdAt
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