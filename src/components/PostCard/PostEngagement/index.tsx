"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { TRIGGER_POST_LIKE_MUTATION } from "@/lib/graphql/fragments/mutations/mutations";
import { Box } from "@mui/material"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import {
    StyledPostEngagementContainer,
    StyledPostEngagementItem,
    StyledPostEngagementAction
} from "./style";
import { brand } from '../../common/themePrimitives';

type PostEngagementProps = {
    postId: string,
    likes: any[],
    comments: any[]
}

export default function PostEngagement({ postId, likes, comments }: PostEngagementProps) {

    const { data: session } = useSession();
    const currentUserId = session?.user?.id!

    const router = useRouter()

    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        if (currentUserId) {
            setIsLiked(likes.some(like => like.userId === currentUserId))
        }
    }, [currentUserId])

    const [likeCount, setLikeCount] = useState(likes.length)
    const [triggerLike] = useMutation(TRIGGER_POST_LIKE_MUTATION);

    const triggerLikePost = () => {
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
            <StyledPostEngagementItem>
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
            <StyledPostEngagementItem sx={{ borderRight: 'none' }} onClick={() => router.push('/post/{}')}>
                <StyledPostEngagementAction>
                    <CommentIcon />
                    <Box sx={{ marginLeft: '.3rem' }}>{comments.length}</Box>
                </StyledPostEngagementAction>
            </StyledPostEngagementItem>
        </StyledPostEngagementContainer>
    );
}