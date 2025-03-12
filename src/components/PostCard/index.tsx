import Image from 'next/image';
import Link from 'next/link';
import {
    Box,
    Typography,
    Stack,
    Card,
    CardMedia,
    CardContent
} from '@mui/material';
import { brand } from '../common/themePrimitives';
import months from '@/utils/months';
import PostEngagement from '../PostEngagement';
import PostAuthorChip from '../PostAuthorChip';
import PostVisibilityStatus from '../PostVisibilityStatus';
import PostCategoryChip from '../PostCategoryChip';
import { PostType } from '@/types/post';

type PostCardProps = {
    postData: PostType,
    variants?: string[],
    position?: number
}

export default function PostCard({ postData, variants = [], position }: PostCardProps) {

    const createdAt = postData?.createdAt
    const creationDate = new Date(createdAt)
    const displayDate = `${creationDate.getDate()} ${months[creationDate.getMonth()]} ${creationDate.getFullYear()}`
    const postAuthor = postData?.author
    const postVisibility = postData?.visibility
    const postCategories = postData?.categories ?? []
    const postLikes = postData?.likes ?? []
    const postComments = postData?.comments ?? []

    // min-info variation does not include image, engagement, or categories
    const minInfo = variants.includes('min-info')
    const disabledEngagement = variants.includes('disable-user-engagement')

    const postMediaHeight = minInfo ? 200 : 400

    return (
        <Card
            tabIndex={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: 0,
                height: '100%',
                backgroundColor: 'background.paper',
                '&:hover': {
                    cursor: 'pointer',
                },
                '&:focus-visible': {
                    outline: '3px solid',
                    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
                    outlineOffset: '2px',
                },
                minHeight: '400px'
            }}
        >
            {/* Post Media */}
            {
                postData?.thumbnail && (
                    <CardMedia sx={{ 
                        height: postMediaHeight,
                        position: 'relative' 
                    }}>
                        <Image
                            src={postData?.thumbnail}
                            fill // When using the property fill from next/image you should have a relative component with a defined height.
                            alt={postData?.title}
                            style={{ objectFit: 'cover' }} // Ensures proper scaling
                            priority={position ? position <= 2 : false} // Disabling lazy loading for the first images
                        />
                    </CardMedia>
                )
            }
            {/* Post Author + Date Info */}
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                sx={{
                    backgroundColor: 'background.default',
                    padding: 2,
                    paddingTop: 1,
                    paddingBottom: 1,
                    borderBottom: '1px solid',
                    borderTop: '1px solid',
                    borderColor: brand[200]
                }}
            >
                {
                    !minInfo && (
                        <PostAuthorChip author={postAuthor} />
                    )
                }
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {displayDate}
                </Typography>
            </Stack>
            <CardContent
                sx={{
                    padding: 2,
                    paddingTop: 1,
                }}
            >
                {/* Visibility */}
                <Stack direction="row" sx={{ mb: 1 }}>
                    <PostVisibilityStatus
                        postVisibility={postVisibility} />
                </Stack>
                {/* Title LInk */}
                <Link
                    href={`/post/${postData.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography
                        variant={minInfo ? 'body2' : 'h5'}
                        color="text.primary"
                        sx={{
                            '&:hover': {
                                color: brand[400]
                            },
                            ...(minInfo
                                ? { fontWeight: 'bold', textAlign: 'start', mb: 1 }
                                : {}
                            )
                        }}
                    >
                        {postData.title}
                    </Typography>
                </Link>
                {/* Post Excerpt */}
                <Typography
                    color="text.secondary"
                    sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'start'
                    }}
                    gutterBottom
                >
                    {postData.content}
                </Typography>
            </CardContent>
            <Box sx={{ flexGrow: 1 }}></Box>
            {
                !minInfo && (
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            padding: 2
                        }}
                    >
                        {
                            postCategories.length > 0 && (
                                postCategories.map(category => {
                                    return (
                                        <PostCategoryChip
                                            key={category.id}
                                            category={category} />
                                    )
                                })
                            )
                        }
                    </Stack>
                )
            }
            <PostEngagement
                postId={postData?.id}
                likes={postLikes}
                comments={postComments}
                isDisabled={disabledEngagement}
            />
        </Card>
    );

}