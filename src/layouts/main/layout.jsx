import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

import { Footer } from './footer';
import { NavDesktop } from './nav/nav-desktop';
import { NavMobile } from './nav/mobile/nav-mobile';
import { MainSection } from '../core/main-section';
import { MenuButton } from '../components/menu-button';

// ----------------------------------------------------------------------

export function MainLayout({ sx, children, ...other }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleMobileNavOpen = () => setMobileNavOpen(true);
  const handleMobileNavClose = () => setMobileNavOpen(false);

  const renderNavbar = () => (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        borderBottom: '1px solid rgba(0 0 0 / 0.05)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            py: 2,
            minHeight: { xs: 64, md: 72 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#1c1917',
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            {CONFIG.appName}
          </Typography>

          {/* Desktop Navigation */}
          <NavDesktop
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          />

          {/* Mobile Menu Button */}
          <MenuButton
            onClick={handleMobileNavOpen}
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: '#57534e',
            }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );

  return (
    <>
      {renderNavbar()}

      <NavMobile
        data={[
          { title: 'Home', path: '/' },
          { title: 'Features', path: '#features' },
          { title: 'Pricing', path: '#pricing' },
          { title: 'Dashboard', path: '/dashboard' },
        ]}
        open={mobileNavOpen}
        onClose={handleMobileNavClose}
      />

      <MainSection sx={sx} {...other}>
        {children}
      </MainSection>

      <Footer />
    </>
  );
} 