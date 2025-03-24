import { useState, useEffect, useTransition, useActionState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    TextField,
    Button,
    Typography,
    Stack
} from "@mui/material";
import LinearLoading from "../Loading/Linear";
import { createCategory } from "./actions";

type CategoryFormProps = {
    closeModal: () => void
}

export default function CategoryForm({ closeModal }: CategoryFormProps ) {

    // Error states
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameErrorMessage, setNameErrorMessage] = useState<string>('')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPending, startTransition] = useTransition()
    const initialState = {
        success: false,
        message: ''
    }

    const [state, formAction, pending] = useActionState(createCategory, initialState)

    useEffect(() => {
        if (!pending && state?.success) {
            closeModal();
        }
    }, [pending, state?.success, closeModal]);

    // client side validation
    const validateInputs = (formData: FormData) => {
        let isValid = true;
        const name: string = (formData.get("name") as string) ?? "";
        if (!name || name.length < 5) {
            setNameError(true);
            setNameErrorMessage('Title must be at least 5 characters long.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }
        return isValid
    };

    // Submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation()
        // Transform into FormData
        const formData = new FormData(event.currentTarget);
        if (!validateInputs(formData)) {
            return;
        }
        startTransition(() => {
            formAction(formData)
        })
    };

    if ((pending && !state?.success)) return (
        <Box sx={{ my: 4 }}>
            <Stack direction='column' alignItems='center'>
                <Typography
                    variant='h5'
                    color='text.primary'>
                    Creating category
                </Typography>
                <Box sx={{ width: '100%', mt: 4 }}>
                    <LinearLoading />
                </Box>
            </Stack>
        </Box>
    )

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            {/* Name */}
            <FormControl>
                <FormLabel htmlFor="title">Category name</FormLabel>
                <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    placeholder="Enter category name"
                    error={nameError}
                    helperText={nameErrorMessage}
                />
            </FormControl>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={false}
            >
                {pending ? 'Creating...' : 'Create Post'}
            </Button>
        </Box>
    )

}