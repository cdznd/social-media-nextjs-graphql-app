import { Modal, Box } from '@mui/material'

type ModalContainerProps = {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode
}

export default function ModalContainer(
    { open, onClose, children }: ModalContainerProps
) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="notifications-modal"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {
                    xs: '100%',
                    md: 800
                },
                maxHeight: '80%',
                overflowY: 'scroll',
                bgcolor: 'background.paper',
                boxShadow: 24,
                borderRadius: '1rem',
                paddingY: '1.5rem',
                paddingX: '2rem'
            }}>
                {children}
            </Box>
        </Modal>
    )
}