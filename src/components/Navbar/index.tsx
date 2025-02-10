import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react';

import {
  Box,
  AppBar,
  Button,
  IconButton,
  Container,
  Divider,
  MenuItem,
  Drawer,
  Typography,
  Avatar,
  Menu
} from '@mui/material'

import { StyledToolbar } from './style';

import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useRouter } from 'next/navigation';
import { SitemarkIcon } from '../common/CustomIcons';
import ColorModeIconDropdown from '../ColorModeIconDropdown';

export default function Navbar() {

  const router = useRouter();

  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const userLogged = session?.user

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const openSignInPage = () => {
    router.push('/sign-in')
  }

  const openSignUpPage = () => {
    router.push('/sign-up')
  }

  const handleLogout = () => {
    signOut({ redirect: false })
  }

  const handleOpenMyProfile = () => {
    router.push('app/my-profile')
  }

  const navbarItems = [
    {
      label: 'Feed',
      open: () => { router.push('/') }
    },
    {
      label: 'Friends',
      open: () => { router.push('/friends') }
    },
    {
      label: 'Explore',
      open: () => { router.push('/explore') }
    },
    {
      label: 'New Post',
      open: () => { router.push('/app/new-post') }
    }
  ]

  const renderNavbarItems = navbarItems.map((item, key) => {
    return (
      <Button
        key={key}
        variant="text"
        color="info"
        size="small"
        onClick={item.open}
      >
        {item.label}
      </Button>
    )
  })

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          {/* NavItems */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <SitemarkIcon />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {renderNavbarItems}
            </Box>
          </Box>
          {/* NavAuthButtons */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {
              !userLogged ? (
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={() => openSignInPage()}
                  >
                    Sign in
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => openSignUpPage()}
                  >
                    Sign up
                  </Button>
                </>
              ) : (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* User Email */}
                    <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' } }}>
                      {userLogged.email}
                    </Typography>

                    {/* Profile Picture with Dropdown Menu */}
                    <Avatar
                      alt={userLogged.name || 'User'}
                      src={userLogged?.image}
                      onClick={handleMenuOpen}
                      sx={{ cursor: 'pointer' }}
                    />

                    {/* Dropdown Menu */}
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
                      <MenuItem onClick={handleOpenMyProfile}>
                        <Button color="primary" variant="contained" size="small" fullWidth>
                          My Profile
                        </Button>
                      </MenuItem>
                    </Menu>
                  </Box>
                </>
              )
            }
            <ColorModeIconDropdown />
          </Box>
          {/* Mobile */}
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
                {renderNavbarItems}
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
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
