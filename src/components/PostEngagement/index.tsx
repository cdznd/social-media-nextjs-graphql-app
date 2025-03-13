"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Box } from "@mui/material"
import CommentIcon from '@mui/icons-material/Comment';
import { brand, gray } from '../common/themePrimitives';
import { LikeType } from "@/types/like";
import { CommentType } from "@/types/comment";
import { triggerLike } from "./actions";
import EngagementLike from "./EngagementLike";

type PostEngagementProps = {
    postId: string,
    likes: LikeType[],
    comments: CommentType[],
    isDisabled: boolean,
    variants?: string[]
}

/**
 * This is a Client Component, because it has interactivity and event listeners
 * like onClick
 */
export default function PostEngagement(
    { postId, likes, comments, isDisabled, variants = [] }: PostEngagementProps
) {
    const { data: session } = useSession();
    const currentUserId = session?.user?.id
    const [hasUserLiked, setHasUserLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(likes.length)

    useEffect(() => {
        if(currentUserId) {
            setHasUserLiked(likes.some(like => like.userId === currentUserId))
        }
    }, [currentUserId, likes])

    if (!currentUserId) {
        return null
    }

    const triggerLikePost = async () => {
        // Server function/action
        const result = await triggerLike(currentUserId, postId)
        if (result.success) {
            setHasUserLiked(state => !state)
            setLikeCount(result.likes.length)
        } else {
            alert(result.error)
        }
    }

    const isPostPage = variants.includes('isPostPage')

    return (
        <Box
            sx={{
                display: 'flex',
                borderTop: !isPostPage ? '1px solid' : 'none',
                borderColor: gray[400],
                padding: 1,
            }}
        >
            {/* Engagement Like */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRight: '1px solid',
                    borderColor: gray[300],
                    flex: 1,
                    ...(isDisabled
                        ? {}
                        : { '&:hover svg': { color: brand[300] } }
                    )
                }}
            >
                <EngagementLike
                    isLiked={hasUserLiked}
                    likeCount={likeCount}
                    triggerLike={triggerLikePost}
                    isDisabled={isDisabled}
                />
            </Box>
            {/* Engagement Comment */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRight: 'none',
                    borderColor: gray[600],
                    flex: 1,
                    ...(isDisabled
                        ? {}
                        : { '&:hover svg': { color: brand[300] } }
                    )
                }}
            >
                <Box
                    onClick={() => { }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& > svg': {
                            height: '1.5rem',
                            width: '1.5rem',
                            transition: '100ms',
                            ...(isDisabled
                                ? { color: gray[400] }
                                : {}
                            )
                        }
                    }}>
                    <CommentIcon />
                    <Box
                        sx={{
                            marginLeft: 1,
                            ...(isDisabled
                                ? { color: gray[400] }
                                : {}
                            )
                        }}>
                        {comments.length}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}