import { Box } from "@mui/material"
import { brand } from '../../common/themePrimitives';

import { useSession } from "next-auth/react";

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import CommentIcon from '@mui/icons-material/Comment';
import {
    StyledPostEngagementContainer,
    StyledPostEngagementItem,
    StyledPostEngagementAction
} from "./style";
import { useMutation } from "@apollo/client";
import { TRIGGER_POST_LIKE_MUTATION } from "@/lib/graphql/fragments/mutations/mutations";

type PostEngagementProps = {
    postId: string,
    likes: any[]
}

export default function PostEngagement({ postId, likes }: PostEngagementProps) {

    const { data: session, status } = useSession();

    const currentUserId = session?.user?.id!
    // Identify if the logged user, check all likes to see if any of them are from the user
    const currentUserLiked = likes.find(like => like.userId === currentUserId)

    // const [isLike, setIsLike] = useState(false)

    const numberOfLikes = likes.length

    const [triggerLike, { loading, error }] = useMutation(TRIGGER_POST_LIKE_MUTATION);

    const triggerLikePost = () => {
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
                        currentUserLiked ? (
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
                    <Box sx={{ marginLeft: '.3rem' }}>{numberOfLikes}</Box>
                </StyledPostEngagementAction>
            </StyledPostEngagementItem>
            <StyledPostEngagementItem sx={{ borderRight: 'none' }}>
                <StyledPostEngagementAction>
                    <CommentIcon />
                    <Box sx={{ marginLeft: '.3rem' }}>35</Box>
                </StyledPostEngagementAction>
            </StyledPostEngagementItem>
        </StyledPostEngagementContainer>
    );
}