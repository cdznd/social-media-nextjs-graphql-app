import {
    useActionState,
    useTransition,
    useState,
    useRef,
    useEffect
} from "react";
import Image from "next/image";
import {
    Box,
    Stack,
    Typography,
    FormControl,
    FormLabel,
    TextField,
    Button
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SpinnerLoading from "../Loading/Spinner";
import LinearLoading from "../Loading/Linear";
import { updateProfile } from "./actions";
import { UserType } from "@/types/user";

type UserProfileUpdateFormProps = {
    closeModal: () => void,
    currentUser: UserType
}

export default function UserProfileUpdateForm(
    { closeModal, currentUser }: UserProfileUpdateFormProps
) {
    const [name, setName] = useState<string>('')
    // Error states
    const [nameError, setNameError] = useState<boolean>(false)
    const [nameErrorMessage, setNameErrorMessage] = useState<string>('')
    // Image
    const imageFileInputRef = useRef<HTMLInputElement>(null)
    // Image Upload state
    const [imageFile, setImageFile] = useState(null);
    const [imageFilePreview, setImageFilePreview] = useState('');
    const [isImageUploading, setIsImageUploading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name)
            if (currentUser?.image) {
                setImageFilePreview(currentUser?.image)
            }
        }
    }, [currentUser])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPending, startTransition] = useTransition()
    const initialState = {
        success: false,
        message: ''
    }

    const [state, formAction, pending] = useActionState(updateProfile, initialState)

    useEffect(() => {
        if (!pending && state?.success) {
            closeModal();
        }
    }, [pending, state?.success]);

    // Image
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const handleFileChange = (event: any) => {
        const targed = event.currentTarget
        const selectedFile = targed?.files[0]
        if (selectedFile) {
            setImageFile(selectedFile);
            setImageFilePreview(URL.createObjectURL(selectedFile));
        }
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const handleImageReset = (event: any) => {
        event.preventDefault();
        if (imageFileInputRef.current) {
            imageFileInputRef.current.value = ""
            setImageFile(null);
            setImageFilePreview('');
        }
    };

    // Submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Transform into FormData
        const formData = new FormData(event.currentTarget);
        // Image upload
        if (imageFile) {
            const imageFormData = new FormData()
            imageFormData.append('imageFile', imageFile)
            try {
                setIsImageUploading(true)
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
                setIsImageUploading(false)
            } catch (error) {
                console.error("Error uploading file:", error);
                setIsImageUploading(false)
            }
        }
        formData.append('userId', currentUser?.id)
        // Appending visibility to formData
        startTransition(() => {
            formAction(formData)
        })
    };

    if (isImageUploading) return (
        <Box sx={{ my: 4 }}>
            <Stack direction='column' alignItems='center'>
                <Typography
                    variant='h5'
                    color='text.primary'>
                    Uploading image.
                </Typography>
                <Box sx={{ width: '100%', mt: 4 }}>
                    <LinearLoading />
                </Box>
            </Stack>
        </Box>
    )
    if ((pending && !state?.success)) return (
        <Box sx={{ my: 4 }}>
            <Stack direction='column' alignItems='center'>
                <Typography
                    variant='h5'
                    color='text.primary'>
                    Creating Post.
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <SpinnerLoading />
                </Box>
            </Stack>
        </Box>
    )

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            {/* Name */}
            <FormControl>
                <FormLabel htmlFor="content">Name</FormLabel>
                <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    placeholder={name}
                    sx={{
                        width: 1,
                        '& .MuiInputBase-root': {
                            height: 'auto',
                            backgroundColor: 'background.default'
                        },
                    }}
                    error={nameError}
                    helperText={nameErrorMessage}
                />
            </FormControl>
            {/* Image */}
            <FormControl>
                <FormLabel htmlFor="raised-button-file">User Photo</FormLabel>
                <input
                    ref={imageFileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
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
                            height: '500px',
                            width: '80%',
                            position: 'relative'
                        }}>
                            <Image
                                src={imageFilePreview}
                                alt="Preview upload"
                                fill={true}
                                style={{
                                    objectFit: 'cover'
                                }}
                            />
                        </Box>
                    )}
                </Stack>
            </FormControl>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={false}
            >
                {pending ? 'Updating...' : 'Update'}
            </Button>
        </Box>
    )

}