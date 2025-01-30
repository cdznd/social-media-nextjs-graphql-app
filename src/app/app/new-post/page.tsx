"use client"

import { useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
} from "@mui/material";

const NewPostPage = () => {
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [contentErrorMessage, setContentErrorMessage] = useState('');

    const validateInputs = () => {
        const title = document.getElementById('title') as HTMLInputElement;
        const content = document.getElementById('content') as HTMLInputElement;

        let isValid = true;

        if (!title.value || title.value.length < 5) {
            setTitleError(true);
            setTitleErrorMessage('Title must be at least 5 characters long.');
            isValid = false;
        } else {
            setTitleError(false);
            setTitleErrorMessage('');
        }

        if (!content.value || content.value.length < 10) {
            setContentError(true);
            setContentErrorMessage('Content must be at least 10 characters long.');
            isValid = false;
        } else {
            setContentError(false);
            setContentErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateInputs()) {
            return;
        }
        const data = new FormData(event.currentTarget);
        console.log({
            title: data.get('title'),
            content: data.get('content'),
            tags: data.get('tags'),
            published: data.get('published') === 'on',
        });
    };

    return (
        <Box
            component="form"
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
                <textarea name="content" id="" style={{ height: '500px' }}></textarea>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="tags">Tags</FormLabel>
                <TextField
                    fullWidth
                    id="tags"
                    name="tags"
                    placeholder="Enter tags separated by commas"
                />
            </FormControl>
            <FormControlLabel
                control={<Checkbox name="published" />}
                label="Publish"
            />
            <Button type="submit" variant="contained" color="primary">
                Create Post
            </Button>
        </Box>
    );
};

export default NewPostPage;