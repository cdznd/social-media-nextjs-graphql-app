import gql from "graphql-tag";

export const POST_FIELDS = gql`
    fragment PostFields on Post {
        id
        title
        content
        createdAt
        thumbnail
        visibility
    }
`

export const POST_LIKES = gql`
    fragment PostLikes on Post {
        likes {
            id
            userId
        }
    }
`

export const POST_COMMENTS = gql`
    fragment PostComments on Post {
        comments {
            id
            content
            user {
                id
                email
                name
                image
                username
            }
            createdAt
        }
    }
`

export const POST_AUTHOR = gql`
    fragment PostAuthor on Post {
        author {
            id
            name
            image
            email
            username
        }
    }
`

export const POST_CATEGORIES = gql`
    fragment PostCategories on Post {
        categories {
            id
            name
        }
    }
`

export const GET_POST = gql`
    query GetPost($postId: String!) {
        post(postId: $postId) {
            ...PostFields
            ...PostAuthor
            ...PostCategories
            ...PostLikes
            ...PostComments
        }
    }
    ${POST_FIELDS}
    ${POST_AUTHOR}
    ${POST_CATEGORIES}
    ${POST_LIKES}
    ${POST_COMMENTS}
`