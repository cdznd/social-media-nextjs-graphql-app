import gql from "graphql-tag";


export const POST_FIELDS = gql`
    fragment PostFields on Post {
        id
        title
        content
        createdAt
        thumbnail
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

export const POST_AUTHOR = gql`
    fragment PostAuthor on Post {
        author {
            id
            name
            image
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