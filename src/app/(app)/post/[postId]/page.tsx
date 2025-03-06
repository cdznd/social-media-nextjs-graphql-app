import createApolloClient from "@/lib/apollo-client/apolloClient"
import { GET_POST } from "@/fragments/queries/post"
import { Typography, Container, Box, Stack, IconButton, Chip } from "@mui/material"
import Image from "next/image"
import PostAuthorChip from "@/components/PostAuthorChip"
import ErrorAlert from "@/components/ErrorAlert"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { gray } from "@/components/common/themePrimitives"

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
    const postAuthor = postData?.author

    if (!postData) return <ErrorAlert message="No Post Found" />

    const renderCategories =
        postData?.categories && postData?.categories.length > 0 ?
            postData?.categories.map((category: any) => {
                return (
                    <Chip
                        key={category?.name}
                        variant="filled"
                        label={category?.name}
                        size='medium'
                    />
                )
            }) : null

    return (
        <Container>

            <Stack
                direction="row"
                justifyContent="start"
                spacing={2}
                sx={{
                    mb: 4
                }}
            >
                <IconButton aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
            </Stack>

            <Box sx={{
                border: '1px solid',
                borderColor: gray[700],
                borderRadius: 1,
                p: 4
            }}>
                <Stack
                    direction="column"
                    justifyContent="start"
                    spacing={1}
                    sx={{
                        mb: 4
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="start"
                    >
                        <PostAuthorChip
                            author={postAuthor} />
                    </Stack>
                    <Typography variant="h3">{postData.title}</Typography>
                </Stack>

                <Stack
                    direction="column"
                    spacing={1}
                >
                    <Box>{renderCategories}</Box>
                    <Box>{postData.content}</Box>
                </Stack>

                <Box sx={{ w: 1, height: '400px', position: 'relative', borderRadius: '1rem', mb: 4, mt: 2 }}>
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

            </Box>
        </Container>
    )

}