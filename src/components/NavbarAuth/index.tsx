import { Button, Typography, Stack } from '@mui/material'
import Link from 'next/link'
import NavbarSubmenu from '../NavbarSubmenu';
import { UserType } from '@/types/user';

type NavbarAuthProps = {
    loggedUser?: UserType
}

export default function NavbarAuth({ loggedUser }: NavbarAuthProps) {
    return (
        !loggedUser ? (
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
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontWeight: 700,
                        display: {
                            xs: 'none',
                            sm: 'block',
                        }
                    }}>
                    {loggedUser.username}
                </Typography>
                <NavbarSubmenu
                    loggedUser={loggedUser} />
            </Stack>
        )
    )
}