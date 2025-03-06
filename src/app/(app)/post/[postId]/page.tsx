import createApolloClient from "@/lib/apollo-client/apolloClient"
import { GET_POST } from "@/fragments/queries/post"
import { Typography, Container, Box } from "@mui/material"
import Image from "next/image"
import ErrorAlert from "@/components/ErrorAlert"

type PostPageParams = Promise<{
    postId: string
}>

async function getPostData(postId: string) {
    const apolloClient = createApolloClient()
    try {
        const { data } = await apolloClient.query({
            query: GET_POST,
            variables: {
                postId
            }
        })
        return { data }
    } catch (error) {
        console.error(error)
        return { data: null }
    }
}

export default async function PostPage(
    props: { params: PostPageParams }
) {
    const { postId } = await props.params
    const { data } = await getPostData(postId)
    const postData = data?.post
    // const postAuthor = postData?.author

    if (!postData) return <ErrorAlert message="No Post Found" />

    return (
        <Container>
            {/* Card for user */}
            <Typography variant="h3" sx={{ mb: 4 }}>{postData.title}</Typography>

            <Box sx={{ w: 1, height: '400px', position: 'relative', borderRadius: '1rem', mb: 4 }}>
                <Image
                    src={postData?.thumbnail}
                    fill={true}
                    alt={postData.title}
                    style={{
                        objectFit: 'cover',
                        borderRadius: '1rem'
                    }}
                />
            </Box>

            <Box>
                {postData.content}
            </Box>
        </Container>
    )

}