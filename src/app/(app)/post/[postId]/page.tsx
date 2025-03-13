import Image from "next/image"
import Link from "next/link"

import createApolloClient from "@/lib/apollo-client/apolloClient"
import { GET_POST } from "@/fragments/queries/post"

import { Typography, Container, Box, Stack, IconButton, Chip } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { gray } from "@/components/common/themePrimitives"

import PostVisibilityStatus from "@/components/PostVisibilityStatus"
import PostCategoryChip from "@/components/PostCategoryChip"
import PostEngagement from "@/components/PostEngagement"
import PostAuthorChip from "@/components/PostAuthorChip"
import PostComments from "@/components/PostComments"
import ErrorAlert from "@/components/ErrorAlert"

import { CategoryType } from "@/types/category"

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

    // console.log('postData');
    // console.log(postData);

    const postAuthor = postData?.author
    const postCategories = postData?.categories
    const postLikes = postData?.likes ?? []
    const postComments = postData?.comments ?? []

    if (!postData) return <ErrorAlert message="No Post Found" />

    const postImageHeight = 500

    return (
        <Container>
            {/* Back button */}
            <Stack
                direction="row"
                justifyContent="start"
                spacing={2}
                sx={{
                    mb: 4
                }}
            >
                <Link
                    href='/feed'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <IconButton aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
            </Stack>
            {/* Post Authos + Title + visibility  */}
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
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        w: 1
                    }}
                >
                    <PostAuthorChip
                        author={postAuthor} />
                    <PostVisibilityStatus
                        postVisibility={postData?.visibility} />
                </Stack>
                <Typography
                    variant="h3"
                    color="text.primary">
                    {postData.title}
                </Typography>
            </Stack>
            {/* Post Categories + Content */}
            <Stack
                direction="column"
                spacing={1}
            >
                <Stack
                    direction="row"
                    spacing={1}
                >
                    {
                        postCategories.length > 0 && (
                            postCategories.map((category: CategoryType) => {
                                return (
                                    <PostCategoryChip
                                        key={category.id}
                                        category={category} />
                                )
                            })
                        )
                    }
                </Stack>
                <Typography
                    variant="body2"
                    color="text.secondary">
                    {postData.content}
                </Typography>
            </Stack>
            {/* Post Image */}
            <Box sx={{
                w: 1,
                height: postImageHeight,
                position: 'relative',
                borderRadius: 8,
                mt: 2
            }}>
                <Image
                    src={postData?.thumbnail}
                    fill={true}
                    alt={postData.title}
                    style={{
                        objectFit: 'cover',
                        borderRadius: 8
                    }}
                />
            </Box>
            {/* Post Engagement */}
            <Box
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mt: 2
                }}
            >
                <PostEngagement
                    postId={postId}
                    likes={postLikes}
                    comments={postComments}
                    isDisabled={false}
                    variants={['isPostPage']}
                />
            </Box>
            {/* Post Comments */}
            <Box
                sx={{
                    mt: 4
                }}
            >
                <Typography variant="h6" color="text.primary">Comments</Typography>
                <PostComments
                    postId={postId}
                    comments={postComments} />
            </Box>
        </Container>
    )

}