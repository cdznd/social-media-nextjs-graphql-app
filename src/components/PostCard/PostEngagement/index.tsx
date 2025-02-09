import { useState } from "react";
import { Box } from "@mui/material"
import { gray, brand } from '../../common/themePrimitives';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import CommentIcon from '@mui/icons-material/Comment';

export default function PostEngagement() {

    const [isLike, setIsLike] = useState(false)

    return (
        <Box sx={{
            display: 'flex',
            borderTop: '1px solid',
            borderColor: gray[700],
            padding: '.5rem'
        }}>

            {/* Likes */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRight: '1px solid',
                    borderColor: gray[600],
                    flex: 1,
                }}
                onClick={() => setIsLike(prev => !prev)}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {
                        isLike ? (
                            <ThumbUpIcon
                                sx={{
                                    height: '1.5rem',
                                    width: '1.5rem',
                                    color: brand[700]
                                }}
                            />
                        ) : (
                            <ThumbUpOffAltIcon
                                sx={{
                                    height: '1.5rem',
                                    width: '1.5rem',
                                }}
                            />
                        )
                    }
                    <Box sx={{
                        marginLeft: '.3rem'
                    }}>35</Box>
                </Box>
            </Box>

            {/* Comments */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CommentIcon
                        sx={{
                            height: '1.5rem',
                            width: '1.5rem'
                        }}
                    />
                    <Box sx={{
                        marginLeft: '.3rem'
                    }}>35</Box>
                </Box>
            </Box>

        </Box>
    )

}