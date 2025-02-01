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
`

export const GET_POSTS = gql`
    query GetAllPosts {
        posts {
            id
            title
        }
    }
`