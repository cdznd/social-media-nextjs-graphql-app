'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { Stack, Button } from '@mui/material'
import ErrorAlert from '@/components/ErrorAlert'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <ErrorAlert message={`${error}`} />
            <Button
                variant='outlined'
                sx={{
                    mt: 2
                }}
                onClick={
                    () => reset()
                }>
                Reload
            </Button>
        </Stack>
    )
}