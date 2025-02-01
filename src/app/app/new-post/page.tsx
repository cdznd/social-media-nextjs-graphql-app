"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    FormControl,
    FormLabel,
    TextField,
    Button,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { CREATE_POST_MUTATION } from "@/graphql/mutations";
import { StyledTextarea } from "@/components/common/CustomTextArea";

type CreatePostDTO = {
    title: String,
    content: String,
    authorId: String
};

const NewPostPage = () => {

    const router = useRouter()

    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [contentErrorMessage, setContentErrorMessage] = useState('');

    const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION);

    const validateInputs = (formData: any) => {

        let isValid = true;

        const title = formData.get('title')
        const content = formData.get('content')

        if (!title || title.length < 5) {
            setTitleError(true);
            setTitleErrorMessage('Title must be at least 5 characters long.');
            isValid = false;
        } else {
            setTitleError(false);
            setTitleErrorMessage('');
        }

        if (!content || content.length < 10) {
            setContentError(true);
            setContentErrorMessage('Content must be at least 10 characters long.');
            isValid = false;
        } else {
            setContentError(false);
            setContentErrorMessage('');
        }

        return isValid
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (!validateInputs(formData)) {
            return;
        }
        const createPostData: CreatePostDTO = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            authorId: 'cm6h4havf00020hukais5q0g6'
        }
        try {
            const response = await createPost({
                variables: { ...createPostData },
            });
            console.log('Post created successfully:', response.data.createPost);
            router.push('/app')
        } catch (err) {
            console.error('Error creating post:', err);
        }
    };

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3 }}
        >
            <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <TextField
                    required
                    fullWidth
                    id="title"
                    name="title"
                    placeholder="Enter post title"
                    error={titleError}
                    helperText={titleErrorMessage}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="content">Content</FormLabel>
                <StyledTextarea
                    id="content"
                    name="content"
                    placeholder="Enter post content"
                />
                {contentError && <p style={{ color: 'red' }}>Error: {contentErrorMessage}</p>}
            </FormControl>
            {/* <FormControl>
                <FormLabel htmlFor="tags">Tags</FormLabel>
                <TextField
                    fullWidth
                    id="tags"
                    name="tags"
                    placeholder="Enter tags separated by commas"
                />
            </FormControl> */}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
            >
                {loading ? 'Creating...' : 'Create Post'}
            </Button>
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </Box>
    );
};

export default NewPostPage;