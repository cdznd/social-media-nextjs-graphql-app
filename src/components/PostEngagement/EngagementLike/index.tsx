import { useOptimistic, useTransition } from 'react'
import { Box } from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { gray, brand } from '@/components/common/themePrimitives';

type PostEngagementProps = {
    isLiked: boolean,
    likeCount: number,
    triggerLike: () => void,
    isDisabled: boolean
}

type OptimisticState = {
    isLiked: boolean;
    likeCount: number;
};

export default function EngagementLike(
    { isLiked, likeCount, triggerLike, isDisabled }: PostEngagementProps
) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPending, startTransition] = useTransition()

    const triggerLikeAction = () => {
        if (isDisabled) return;
        startTransition(() => {
            updateOptimisticState(null)
            triggerLike()
        })
    }

    const optimisticInitialState = {
        isLiked,
        likeCount,
    }

    const [optimisticState, updateOptimisticState] = useOptimistic(
        optimisticInitialState,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (state: OptimisticState, action: null) => ({
            isLiked: !state.isLiked,
            likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        })
    )

    return (
        <Box
            onClick={triggerLikeAction}
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
                optimisticState.isLiked ? (
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
                {optimisticState.likeCount}
            </Box>
        </Box>
    )

}