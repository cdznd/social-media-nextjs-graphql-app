"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Box } from "@mui/material"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { brand, gray } from '../common/themePrimitives';
import { LikeType } from "@/types/like";
import { CommentType } from "@/types/comment";

import { triggerLike } from "./actions";

type PostEngagementProps = {
    postId: string, // Why do we need?
    likes: LikeType[],
    comments: CommentType[],
    isDisabled: boolean
}

/**
 * This is a Client Component, because it has interactivity and event listeners
 * like onClick
 */
export default function PostEngagement(
    { postId, likes, comments, isDisabled }: PostEngagementProps
) {
    const { data: session } = useSession();
    const currentUserId = session?.user?.id

    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(likes.length)

    useEffect(() => {
        if (currentUserId) {
            setIsLiked(likes.some(like => like.userId === currentUserId))
        }
    }, [currentUserId, likes])

    if(!currentUserId) {
        return null
    }

    // Client interactivity with click event
    const triggerLikePost = async () => {
        if (isDisabled) {
            return null
        }
        setIsLiked(!isLiked);
        const result = await triggerLike(currentUserId, postId)
        setLikeCount(result.length);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                borderTop: '1px solid',
                borderColor: gray[400],
                padding: 1,
            }}
        >
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
                <Box
                    onClick={triggerLikePost}
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
                    {
                        isLiked ? (
                            <ThumbUpIcon
                                sx={{
                                    color: brand[700],
                                }}
                            />
                        ) : (<ThumbUpOffAltIcon />)
                    }
                    <Box
                        sx={{
                            marginLeft: 1,
                            ...(isDisabled
                                ? { color: gray[400] }
                                : {}
                            )
                        }}>
                        {likeCount}
                    </Box>
                </Box>
            </Box>
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
                    onClick={triggerLikePost}
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