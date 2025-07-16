import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Product',
    children: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Templates', href: '/templates' },
      { name: 'Integrations', href: '/integrations' },
    ],
  },
  {
    headline: 'Company',
    children: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press Kit', href: '/press' },
    ],
  },
  {
    headline: 'Support',
    children: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Community', href: '/community' },
      { name: 'API Docs', href: '/docs' },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  },
  {
    headline: 'Resources',
    children: [
      { name: 'Docs', href: '/docs' },
      { name: 'API', href: '/api' },
      { name: 'Guides', href: '/guides' },
      { name: 'FAQs', href: '/faqs' },
    ],
  },
];

const SOCIALS = [
  {
    name: 'Twitter',
    icon: 'eva:twitter-fill',
    href: 'https://twitter.com',
  },
  {
    name: 'LinkedIn',
    icon: 'eva:linkedin-fill',
    href: 'https://linkedin.com',
  },
  {
    name: 'GitHub',
    icon: 'eva:github-fill',
    href: 'https://github.com',
  },
  {
    name: 'Discord',
    icon: 'ic:baseline-discord',
    href: 'https://discord.com',
  },
];

// ----------------------------------------------------------------------

export function Footer({ sx, ...other }) {
  const renderLogo = () => (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#1c1917',
          mb: 2,
          fontSize: { xs: '1.5rem', md: '2rem' },
        }}
      >
        {CONFIG.appName}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#57534e',
          lineHeight: 1.6,
          maxWidth: { xs: '100%', md: 320 },
          fontSize: '0.875rem',
        }}
      >
        Empowering businesses with professional dashboard solutions. 
        Built with modern technologies for the modern world.
      </Typography>
      
      {/* Social Media Icons */}
      <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
        {SOCIALS.map((social) => (
          <IconButton
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: 40,
              height: 40,
              borderRadius: '8px',
              bgcolor: '#f3f4f6',
              color: '#57534e',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: '#d97706',
                color: 'white',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Iconify icon={social.icon} width={20} />
          </IconButton>
        ))}
      </Stack>
    </Box>
  );

  const renderLinks = () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: { xs: 'flex-start', md: 'space-between' },
        gap: { xs: 4, md: 6 },
      }}
    >
      {LINKS.map((list) => (
        <Box
          key={list.headline}
          sx={{
            minWidth: { xs: '45%', sm: 160, md: 180 },
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: '#1c1917',
              fontSize: '1rem',
            }}
          >
            {list.headline}
          </Typography>
          <Stack spacing={1.25}>
            {list.children.map((link) => (
              <Box
                key={link.name}
                component={RouterLink}
                href={link.href}
                sx={{
                  color: '#57534e',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease',
                  display: 'block',
                  lineHeight: 1.5,
                  '&:hover': {
                    color: '#d97706',
                  },
                }}
              >
                {link.name}
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      component="footer"
      sx={[
        {
          py: { xs: 6, md: 10 },
          bgcolor: 'white',
          borderTop: '1px solid #e5e7eb',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container maxWidth="xl">
        {/* Main Footer Content */}
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          sx={{ mb: { xs: 6, md: 10 }, alignItems: 'flex-start' }}
        >
          {/* Logo and Description */}
          <Grid xs={12} md={4} lg={3}>
            {renderLogo()}
          </Grid>
          
          {/* Links */}
          <Grid xs={12} md={8} lg={9}>
            {renderLinks()}
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: '1px solid #e5e7eb',
            pt: { xs: 3, md: 4 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'center' },
            gap: { xs: 2, sm: 0 },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#57534e',
              fontSize: '0.875rem',
            }}
          >
            © 2024 {CONFIG.appName}. All rights reserved.
          </Typography>

          <Stack
            direction="row"
            spacing={3}
            divider={
              <Box sx={{ width: 1, height: 16, bgcolor: '#e5e7eb' }} />
            }
            sx={{
              alignItems: 'center',
            }}
          >
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <Box
                key={item}
                component={RouterLink}
                href={`/${item.toLowerCase()}`}
                sx={{
                  color: '#57534e',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#d97706',
                  },
                }}
              >
                {item}
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
} 