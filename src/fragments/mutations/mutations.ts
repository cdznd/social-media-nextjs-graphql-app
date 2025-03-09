import gql from "graphql-tag";
import { POST_LIKES } from "../queries/post";

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


export const TRIGGER_POST_LIKE_MUTATION = gql`
    mutation TriggerLike($userId: String!, $postId: String!) {
        triggerLike(userId: $userId, postId: $postId) {
            id
            ...PostLikes
        }
    }
    ${POST_LIKES}
`

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser(
        $name: String!,
        $email: String!,
        $password: String!,
        $username: String!,
        $image: String
    ) {
        createUser(
            name: $name,
            email: $email,
            password: $password,
            username: $username,
            image: $image
        ) {
            id
        }
    }
`
