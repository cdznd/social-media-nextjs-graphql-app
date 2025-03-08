import { Chip } from "@mui/material"
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

type PostVisibilityStatusProps = {
    postVisibility: string
}

export default function PostVisibilityStatus(
    { postVisibility }: PostVisibilityStatusProps
) {
    return (
        <Chip
            icon={postVisibility === 'PUBLIC' ? <PublicIcon /> : <LockIcon />}
            color={postVisibility === 'PUBLIC' ? 'success' : 'info'}
            variant='outlined'
            label={postVisibility === 'PUBLIC' ? 'Public' : "Private"}
            sx={{
                p: 1
            }}
        />
    )
}