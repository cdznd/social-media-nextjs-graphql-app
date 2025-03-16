"use client"

import { useState, useRef, useActionState } from "react";
import {
    Box,
    FormControl,
    Stack,
    FormLabel,
    TextField,
    Button,
    FormControlLabel,
    FormGroup,
    Checkbox,
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import { createPost } from "./actions";
import { CategoryType } from "@/types/category";

type PostFormProps = {
    categories: CategoryType[],
    closeModal: () => void
}

export default function PostForm(
    { categories, closeModal }: PostFormProps
) {

    // Error states
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [contentErrorMessage, setContentErrorMessage] = useState('');
    // Image
    const imageFileInputRef = useRef<HTMLInputElement>(null)
    // Image Upload state
    const [imageFile, setImageFile] = useState(null);
    const [imageFilePreview, setImageFilePreview] = useState('');
    // Visibility
    const [postVisibility, setPostVisibility] = useState('PRIVATE')

    // Server action
    const initialState = {
        success: false,
        message: ''
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, formAction, pending] = useActionState(createPost, initialState)

    // Categories
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const handleChange = (event: any) => {
        const value = event.target.value;
        setSelectedValues((prev: any) =>
            prev.includes(value) ? prev.filter((item: any) => item !== value) : [...prev, value]
        );
    };

    // Image
    const handleFileChange = (event: any) => {
        const targed = event.currentTarget
        const selectedFile = targed?.files[0]
        if (selectedFile) {
            setImageFile(selectedFile);
            setImageFilePreview(URL.createObjectURL(selectedFile));
        }
    }

    const handleImageReset = (event: any) => {
        event.preventDefault();
        if (imageFileInputRef.current) {
            imageFileInputRef.current.value = ""
            setImageFile(null);
            setImageFilePreview('');
        }
    };

    // client side validation
    const validateInputs = (formData: FormData) => {
        let isValid = true;
        const title: string = (formData.get("title") as string) ?? "";
        const content: string = (formData.get("content") as string) ?? "";
        if (!title || title.length < 5) {
            setTitleError(true);
            setTitleErrorMessage('Title must be at least 5 characters long.');
            isValid = false;
        } else {
            setTitleError(false);
            setTitleErrorMessage('');
        }
        if (!content || content.length < 10) {
            console.log('checking content lenght');
            console.log(content.length);
            setContentError(true);
            setContentErrorMessage('Content must be at least 10 characters long.');
            isValid = false;
        } else {
            setContentError(false);
            setContentErrorMessage('');
        }
        return isValid
    };

    // Submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('handle submit');
        // Transform into FormData
        const formData = new FormData(event.currentTarget);
        if (!validateInputs(formData)) {
            return;
        } else {
            setTitleError(false);
            setContentError(false);
        }
        if (imageFile) {
            const imageFormData = new FormData()
            imageFormData.append('imageFile', imageFile)
            try {
                const response = await fetch("/api/s3-upload", {
                    method: "POST",
                    body: imageFormData,
                });
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.error || "Upload failed");
                }
                const imageFileS3Url = result?.fileUrl
                formData.append("thumbnail", imageFileS3Url)
                console.log('upload went well!');
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
        // Appending visibility to formData
        formData.append('visibility', postVisibility)
        formAction(formData)
        closeModal()
    };

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            {/* Title */}
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
            {/* Content */}
            <FormControl>
                <FormLabel htmlFor="content">Content</FormLabel>
                <TextField
                    required
                    fullWidth
                    multiline
                    minRows={8}
                    id="content"
                    name="content"
                    placeholder="Content"
                    sx={{
                        width: 1,
                        '& .MuiInputBase-root': {
                            height: 'auto',
                            backgroundColor: 'background.default'
                        },
                    }}
                    error={contentError}
                    helperText={contentErrorMessage}
                />
            </FormControl>
            {/* Image */}
            <FormControl>
                <FormLabel htmlFor="raised-button-file">Image</FormLabel>
                <input
                    ref={imageFileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    name="imageFile"
                    onChange={handleFileChange}
                />
                <Stack
                    direction='column'
                    alignItems='center'
                    justifyContent='center'
                    sx={{
                        padding: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        backgroundColor: 'background.default'
                    }}>
                    {
                        !imageFilePreview ? (
                            <FormLabel htmlFor="raised-button-file" sx={{ mb: 0 }}>
                                <Button variant="contained" component="span">
                                    Choose Image
                                </Button>
                            </FormLabel>
                        ) : <FormLabel>
                            <Button
                                variant="outlined"
                                component="span"
                                onClick={(event) => handleImageReset(event)}
                            >
                                <ClearIcon />
                            </Button>
                        </FormLabel>
                    }
                    {imageFilePreview && (
                        <Box sx={{
                            padding: '2rem',
                            height: '500px'
                        }}>
                            <img src={imageFilePreview} alt="Preview" style={{ maxWidth: '100%', height: '100%' }} />
                        </Box>
                    )}
                </Stack>
            </FormControl>
            {/* Categories */}
            <FormControl
                sx={{
                    maxHeight: '12rem',
                    overflowY: 'scroll'
                }}
            >
                <FormLabel id="category-selector-label">Select Categories</FormLabel>
                <FormGroup row>
                    {categories.map((category: CategoryType) => (
                        <FormControlLabel
                            key={category.id}
                            control={
                                <Checkbox
                                    checked={selectedValues.includes(category.name)}
                                    onChange={handleChange}
                                    value={category.name}
                                    sx={{ display: "none" }}
                                />
                            }
                            label={
                                <Box
                                    sx={{
                                        border: '1px solid #666',
                                        borderColor: selectedValues.includes(category.name) ? "primary.main" : "grey.400",
                                        borderRadius: '1rem',
                                        padding: '.8rem',
                                        paddingX: '1.2rem',
                                        marginRight: '.8rem',
                                        marginBottom: '.8rem',
                                        cursor: "pointer",
                                        backgroundColor: selectedValues.includes(category.name) ? "primary.light" : "transparent",
                                        transition: "0.3s",
                                        textAlign: "center"
                                    }}
                                >
                                    {category.name}
                                </Box>
                            }
                            sx={{
                                margin: 0
                            }}
                        />
                    ))}
                </FormGroup>
            </FormControl>
            <FormControl>
                <FormLabel id="post-visibility-toggle">Visibility</FormLabel>
                <ToggleButtonGroup
                    value={postVisibility}
                    onChange={(event) => setPostVisibility(event.target.value)}
                    aria-label="Platform"
                    sx={{
                        backgroundColor: 'background.paper',
                        boxShadow: 'none !important',
                        border: 'none'
                    }}
                >
                    <ToggleButton
                        value="PUBLIC"
                        aria-label="post-visibility-public"
                    > <PublicIcon sx={{ mr: 1 }} />Public </ToggleButton>
                    <ToggleButton
                        value="PRIVATE"
                        aria-label="post-visibility-private"
                    > <LockIcon sx={{ mr: 1 }}/>Private </ToggleButton>
                </ToggleButtonGroup>
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
    );
};
