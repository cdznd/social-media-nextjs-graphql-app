"use client"
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { TRIGGER_POST_LIKE_MUTATION } from "@/fragments/mutations/mutations";
import { Box } from "@mui/material"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import {
    StyledPostEngagementContainer,
    StyledPostEngagementItem,
    StyledPostEngagementAction
} from "./style";
import { brand } from '../common/themePrimitives';
import { LikeType } from "@/types/like";
import { CommentType } from "@/types/comment";

type PostEngagementProps = {
    postId: string,
    likes: LikeType[],
    comments: CommentType[],
    isDisabled: boolean
}

export default function PostEngagement({ postId, likes, comments, isDisabled }: PostEngagementProps) {

    const { data: session } = useSession();
    const currentUserId = session?.user?.id

    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        if (currentUserId) {
            setIsLiked(likes.some(like => like.userId === currentUserId))
        }
    }, [currentUserId, likes])

    const [likeCount, setLikeCount] = useState(likes.length)
    const [triggerLike] = useMutation(TRIGGER_POST_LIKE_MUTATION);

    const triggerLikePost = () => {
        if (isDisabled) {
            return null
        }
        if (!isLiked) {
            setIsLiked(true)
            setLikeCount(prev => prev + 1)
        } else {
            setIsLiked(false)
            setLikeCount(prev => prev - 1)
        }
        triggerLike({
            variables: {
                userId: session?.user.id,
                postId: postId
            }
        })
    }

    return (
        <StyledPostEngagementContainer>
            <StyledPostEngagementItem sx={isDisabled ? {} : {
                '&:hover svg': {
                    color: brand[300]
                }
            }}>
                <StyledPostEngagementAction onClick={triggerLikePost}>
                    {
                        isLiked ? (
                            <ThumbUpIcon
                                sx={{
                                    height: '1.5rem',
                                    width: '1.5rem',
                                    color: brand[700],
                                    transition: '100ms',
                                }}
                            />
                        ) : (
                            <ThumbUpOffAltIcon
                                sx={{
                                    height: '1.5rem',
                                    width: '1.5rem',
                                    transition: '100ms',
                                }}
                            />
                        )
                    }
                    <Box sx={{ marginLeft: '.3rem' }}>{likeCount}</Box>
                </StyledPostEngagementAction>
            </StyledPostEngagementItem>
            <StyledPostEngagementItem sx={isDisabled ? { borderRight: 'none' } : {
                borderRight: 'none',
                '&:hover svg': {
                    color: brand[300]
                }
            }}>
                <StyledPostEngagementAction>
                    <CommentIcon />
                    <Box sx={{ marginLeft: '.3rem' }}>{comments.length}</Box>
                </StyledPostEngagementAction>
            </StyledPostEngagementItem>
        </StyledPostEngagementContainer>
    );
}