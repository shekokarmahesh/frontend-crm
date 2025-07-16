import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { CONFIG } from 'src/global-config';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const navData = [
  { title: 'Home', path: '/' },
  { title: 'Features', path: '#features' },
  { title: 'Pricing', path: '#pricing' },
  { title: 'Dashboard', path: paths.dashboard.root },
];

const StyledNavItem = styled(Button)(({ theme }) => ({
  color: '#57534e',
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'none',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '#d97706',
    backgroundColor: 'rgba(217, 119, 6, 0.04)',
  },
  '&.active': {
    color: '#d97706',
    backgroundColor: 'rgba(217, 119, 6, 0.08)',
  },
}));

// ----------------------------------------------------------------------

export function NavDesktop({ sx, ...other }) {
  return (
    <Box
      component="nav"
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {navData.map((item) => (
        <StyledNavItem
          key={item.title}
          component={RouterLink}
          href={item.path}
          variant="text"
        >
          {item.title}
        </StyledNavItem>
      ))}

      <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
        <Button
          component={RouterLink}
          href={paths.auth.jwt.phoneAuth}
          variant="text"
          sx={{
            color: '#57534e',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              color: '#44403c',
              backgroundColor: 'transparent',
            },
          }}
        >
          Sign In
        </Button>

        <Button
          component={RouterLink}
          href={paths.auth.jwt.phoneAuth}
          variant="contained"
          startIcon={<Iconify icon="solar:rocket-bold" width={18} />}
          sx={{
            bgcolor: '#d97706',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            px: 3,
            '&:hover': {
              bgcolor: '#b45309',
            },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
} 