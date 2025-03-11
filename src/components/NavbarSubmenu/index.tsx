'use client'
import { useState, MouseEvent } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material'
import UserAvatar from '../UserAvatar'

import Link from 'next/link'

export default function NavbarSubmenu() {

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleMenuOpen = (event: MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // signOut({ redirect: true })
    }

    return (
        <>
            <Box onClick={handleMenuOpen}>
                <UserAvatar userImage={userLogged.image} />
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{
                    '&:focus': {
                        outline: 'none'
                    }
                }}
            >
                <MenuItem onClick={handleLogout}>
                    <Button color="primary" variant="contained" size="small" fullWidth>
                        Logout
                    </Button>
                </MenuItem>
                <MenuItem>
                    <Link href={`/my-profile`}>
                        <Button color="primary" variant="contained" size="small" fullWidth>
                            My Profile
                        </Button>
                    </Link>
                </MenuItem>
            </Menu>
        </>
    )
}