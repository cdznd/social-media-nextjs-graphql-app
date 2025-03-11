'use client'
import { useState, MouseEvent } from 'react';
import Link from 'next/link'
import { Box, Button, Menu, MenuItem } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserAvatar from '../UserAvatar'
import { UserType } from '@/types/user';

export default function NavbarSubmenu({ loggedUser }: { loggedUser: UserType }) {

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
            <Box
                onClick={handleMenuOpen}
                sx={{
                    cursor: 'pointer'
                }}    
            >
                <UserAvatar
                    userImage={loggedUser.image}
                    size={{
                        height: 36,
                        width: 36
                    }}
                />
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
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        fullWidth
                        endIcon={<LogoutIcon />}
                    >
                        Logout
                    </Button>
                </MenuItem>
                <MenuItem>
                    <Link
                        href={`/my-profile`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Button
                            size="small"
                            variant="contained"
                            fullWidth
                            endIcon={<AccountCircleIcon />}
                            sx={{
                                '&:focus': {
                                    outline: 'none'
                                }
                            }}
                        >
                            My Profile
                        </Button>
                    </Link>
                </MenuItem>
            </Menu>
        </>
    )
}