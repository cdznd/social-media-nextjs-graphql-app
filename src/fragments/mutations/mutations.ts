import gql from "graphql-tag";
import { POST_LIKES } from "../queries/post";

export const CREATE_POST_MUTATION = gql`
    mutation CreatePost(
        $title: String!,
        $content: String!,
        $authorId: String!,
        $thumbnail: String,
        $categories: [String!]!
        $visibility: PostVisibilityType!
    ) {
        createPost(
            title: $title,
            content: $content,
            authorId: $authorId,
            thumbnail: $thumbnail,
            categories: $categories
            visibility: $visibility
        ) {
            id
        }
    }
`;

export const DELETE_POST_MUTATION = gql`
    mutation DeletePost(
        $postId: String!
    ) {
        deletePost(
            postId: $postId
        ) {
            id
        }
    }
`

export const CREATE_CATEGORY_MUTATION = gql`
    mutation CreateCategory(
        $name: String!
    ) {
        createCategory(
            name: $name
        ) {
            id
        }
    }
`

export const CREATE_POST_COMMENT_MUTATION = gql`
    mutation CreateComment($content: String!, $postId: String!, $userId: String!) {
        createComment(content: $content, postId: $postId, userId: $userId) {
            id
            content
            user {
                id
            }
        }
    }
`

export const DELETE_POST_COMMENT_MUTATION = gql`
    mutation DeleteComment($commentId: String!) {
        deleteMutation(commentId: $commentId) {
            id
        }
    }
`

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

export const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser(
        $userId: String!,
        $name: String,
        $image: String,
    ) {
        updateUser(
            userId: $userId
            name: $name,
            image: $image
        ) {
            id
        }
    }
`