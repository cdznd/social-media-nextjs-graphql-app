import { Alert } from "@mui/material"

const ErrorAlert = ({ message }: { message: String }) => {
    return <Alert severity="warning">{ message }</Alert>
}

export default ErrorAlert;