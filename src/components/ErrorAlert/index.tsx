import { Alert } from "@mui/material"
const ErrorAlert = ({ message }: { message: string }) => {
    return <Alert severity="warning">{ message }</Alert>
}
export default ErrorAlert;