'use client'

import { useState } from 'react'

import {
    Box,
    Button,
    IconButton,
    Divider,
    MenuItem,
    Drawer,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import ColorModeIconDropdown from '../../ColorModeIconDropdown';
import NavbarLinks from '../NavbarLinks';

export default function NavbarMobile() {

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                <ColorModeIconDropdown size="medium" />
                <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="top"
                    open={open}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        sx: {
                            top: 'var(--template-frame-height, 0px)',
                        },
                    }}
                >
                    <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <IconButton onClick={toggleDrawer(false)}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Box>
                        <NavbarLinks />
                        <Divider sx={{ my: 3 }} />
                        <MenuItem>
                            <Button color="primary" variant="contained" fullWidth>
                                Sign up
                            </Button>
                        </MenuItem>
                        <MenuItem>
                            <Button color="primary" variant="outlined" fullWidth>
                                Sign in
                            </Button>
                        </MenuItem>
                    </Box>
                </Drawer>
            </Box>
        </>
    )

}