'use client'
import { Typography, Link } from "@mui/material";
// Date() should run only one time on the client, so should mark it's a client component
export default function Copyright() {
    return (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {'Copyright © '}
            <Link color="text.secondary" href="https://mui.com/">
                Sitemark
            </Link>
            &nbsp;
            {new Date().getFullYear()}
        </Typography>
    );
}