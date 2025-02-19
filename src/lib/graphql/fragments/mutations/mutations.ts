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


export const TRIGGER_POST_LIKE_MUTATION = gql`
    mutation TriggerLike($userId: String!, $postId: String!) {
        triggerLike(userId: $userId, postId: $postId) {
            id
        }
    }
`

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser(
        $name: String!,
        $email: String!,
        $password: String,
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

export const TRIGGER_FRIENDSHIP_MUTATION = gql`
    mutation CreateFriendship($fromUserId: String!, $toUserId: String!) {
        createFriendship(fromUserId: $fromUserId, toUserId: $toUserId) {
            id
        }
    }
`