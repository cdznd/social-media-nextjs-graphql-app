import { Stack, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

type ModalHeaderProps = {
    title: string,
    onClose: () => void
}

export default function ModalHeader(
    { title, onClose }: ModalHeaderProps
) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
        >
            <Typography
                color="text.primary"
                variant="h3">
                {title}
            </Typography>
            <IconButton onClick={onClose} size="small">
                <CloseIcon />
            </IconButton>
        </Stack>
    )
}