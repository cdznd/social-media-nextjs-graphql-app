import { Box } from "@mui/material"
import SpinnerLoading from "@/components/Loading/Spinner"

/**
 * The loading file will be nested inside the layout
 * and will automatically wrap the page and any children below it
 * in a Suspense Boundary.
 * It acts as a Suspense (React component) displaying Loading UI
 * while waiting for the server side finish rendering
 */
export default function Loading() {
    return <Box sx={{
        width: 1,
        height: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <SpinnerLoading />
    </Box>
}