"use client";

import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
        <IconButton
            onClick={() => router.back()}
            aria-label="back" >
            <ArrowBackIcon />
        </IconButton>
    )
}