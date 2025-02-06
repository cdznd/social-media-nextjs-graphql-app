"use client"

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    FormControl,
    FormLabel,
    TextField,
    Button,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormGroup,
    Checkbox
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { CREATE_POST_MUTATION } from "@/lib/graphql/mutations";
import { StyledTextarea } from "@/components/common/CustomTextArea";
import ClearIcon from '@mui/icons-material/Clear';

type CreatePostDTO = {
    title: String,
    content: String,
    authorId: String,
    thumbnail: String
};

type Category = {
    value: String
    label: String,
}

const NewPostPage = () => {

    const router = useRouter()

    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [contentErrorMessage, setContentErrorMessage] = useState('');

    const imageFileInputRef = useRef<HTMLInputElement>(null)

    // Image Upload state
    const [imageFile, setImageFile] = useState(null);
    const [imageFilePreview, setImageFilePreview] = useState('');

    // React.FormEvent<HTMLFormElement>
    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setImageFile(selectedFile);
            setImageFilePreview(URL.createObjectURL(selectedFile));
        }
    }

    const handleReset = (event: any) => {
        event.preventDefault();
        if (imageFileInputRef.current) {
            imageFileInputRef.current.value = ""
            setImageFile(null);
            setImageFilePreview('');
        }
    };

    const categories: Category[] = [
        { value: "electronics", label: "Electronics" },
        { value: "fashion", label: "Fashion" },
        { value: "home", label: "Home" },
        { value: "books", label: "Books" },
        { value: "hacking", label: "Hacking" },
        { value: "entertainemnte", label: 'Entertainement'},
        { value: "cars", label: "Cars" },
        { value: "bikes", label: "Bikes"},
        { value: "Unit tests", label: "Unit tests"}
    ];

    const [selectedValues, setSelectedValues] = useState([]);

    const handleChange = (event: any) => {
        const value = event.target.value;
        setSelectedValues((prev: any) =>
            prev.includes(value) ? prev.filter((item: any) => item !== value) : [...prev, value]
        );
    };

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
        let imageFileS3Url = '';
        if (imageFile) {
            formData.append("imageFile", imageFile);
            try {
                const response = await fetch("/api/s3-upload", {
                    method: "POST",
                    body: formData,
                });
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.error || "Upload failed");
                }
                imageFileS3Url = result?.fileUrl
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
        const createPostData: CreatePostDTO = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            authorId: 'cm6h4havf00020hukais5q0g6',
            thumbnail: imageFileS3Url ?? ''
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
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    border: '1px solid #666',
                    borderRadius: '1rem'
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
                                onClick={(event) => handleReset(event)}
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
                </Box>
            </FormControl>

            <FormControl>
                <FormLabel id="category-selector-label">Select Categories</FormLabel>
                <FormGroup row>
                    {categories.map((category: Category) => (
                        <FormControlLabel
                            key={category.value}
                            control={
                                <Checkbox
                                    checked={selectedValues.includes(category.value)}
                                    onChange={handleChange}
                                    value={category.value}
                                    sx={{ display: "none" }}
                                />
                            }
                            label={
                                <Box
                                    sx={{
                                        border: '1px solid #666',
                                        borderColor: selectedValues.includes(category.value) ? "primary.main" : "grey.400",
                                        borderRadius: '1rem',
                                        padding: '.8rem',
                                        paddingX: '1.2rem',
                                        marginRight: '.8rem',
                                        marginBottom: '.8rem',
                                        cursor: "pointer",
                                        backgroundColor: selectedValues.includes(category.value) ? "primary.light" : "transparent",
                                        transition: "0.3s",
                                        textAlign: "center"
                                    }}
                                >
                                    {category.label}
                                </Box>
                            }
                            sx={{
                                margin: 0
                            }}
                        />
                    ))}
                </FormGroup>
            </FormControl>

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