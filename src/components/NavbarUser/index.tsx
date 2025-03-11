import { Button, Box, Typography } from '@mui/material'
import Link from 'next/link'
import NavbarSubmenu from '../NavbarSubmenu';
import { UserType } from '@/types/user';

type NavbarUserProps = {
    userLogged?: UserType
}

export default function NavbarUser({ userLogged }: NavbarUserProps) {
    return (
        !userLogged ? (
            <>
                <Link
                    href="/sign-in">
                    <Button
                        color="primary"
                        variant="text"
                        size="small">
                        Sign in
                    </Button>
                </Link>
                <Link
                    href="/sign-up">
                    <Button
                        color="primary"
                        variant="contained"
                        size="small">
                        Sign up
                    </Button>
                </Link>
            </>
        ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* User Email */}
                {/* <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {userLogged.email}
                </Typography> */}
                {/* <NavbarSubmenu /> */}
            </Box>
        )
    )
}