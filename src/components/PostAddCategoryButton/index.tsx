import { useState } from 'react';
import { Stack, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ModalContainer from '../ModalContainer';
import ModalHeader from '../ModalHeader';
import CategoryForm from '../CategoryForm';

export default function PostAddCategoryButton() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Stack direction="row" justifyContent="start">
                <Button
                    onClick={handleOpen}
                    variant="contained"
                    color="primary"
                    endIcon={<AddIcon />}
                    sx={{
                        mr: 2,
                        mt: 2
                    }}>
                    New Category
                </Button>
            </Stack>
            {/* Modal */}
            <ModalContainer
                open={open}
                onClose={handleClose}>
                <ModalHeader
                    title='New category'
                    onClose={handleClose} />
                <CategoryForm
                    closeModal={handleClose} />
            </ModalContainer>
        </>
    )

}