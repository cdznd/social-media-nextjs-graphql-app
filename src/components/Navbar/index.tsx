import {
  Box,
  AppBar,
  Container,
  Toolbar
} from '@mui/material'

import dynamic from 'next/dynamic';

import NotificationButton from '../NotificationButton';

import NavbarUser from '../NavbarUser';
import NavbarLinks from './NavbarLinks';
import { SitemarkIcon } from '../common/CustomIcons';
import ColorModeIconDropdown from '../ColorModeIconDropdown';

import { auth } from '@/lib/next-auth/auth';
import createApolloClient from '@/lib/apollo-client/apolloClient';
import { GET_USER_BY_ID } from '@/fragments/queries/user';

const NavbarMobile = dynamic(() => import('./NavbarMobile'));

async function getUserInfo(userId: string) {
  const apolloClient = createApolloClient()
  try {
    const { data } = await apolloClient.query({
      query: GET_USER_BY_ID,
      variables: {
        userId: userId
      }
    })
    return { data, error: null }
  } catch(error) {
    console.error(error)
    return { data: null, error }
  }
}

export default async function Navbar() {

  const session = await auth()
  const loggedUserId = session?.user?.id
  
  // console.log('loggedUserId', loggedUserId);

  const loggedUserData = loggedUserId ? await getUserInfo(loggedUserId) : null;

  // console.log('loggedUserData', loggedUserData);

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
        <Toolbar
          variant="dense"
          disableGutters
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: 2,
            backdropFilter: 'blur(24px)',
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.default',
            boxShadow: 'shadows[1]',
            padding: '8px 12px',
          }}
        >
          {/* Site Logo + Navbar links */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <SitemarkIcon />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {<NavbarLinks />}
            </Box>
          </Box>
          {/* User + Notification + DarkMode */}
          {/* <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          > */}
            {/* <NavbarUser
              userLogged={loggedUserData} /> */}
            {/* <NotificationButton />
            <ColorModeIconDropdown /> */}
          {/* </Box> */}

          {/* Mobile */}
          <NavbarMobile />

        </Toolbar>
      </Container>
    </AppBar>
  );
}
