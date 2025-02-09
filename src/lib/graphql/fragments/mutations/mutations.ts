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
