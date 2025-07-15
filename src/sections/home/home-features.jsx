import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

const FEATURES = [
  {
    icon: 'solar:chart-2-bold-duotone',
    title: 'Analytics Dashboard',
    description: 'performance with beautiful charts, real-time metrics, comprehensive reporting tools',
    color: '#3b82f6',
  },
  {
    icon: 'solar:calendar-bold-duotone',
    title: 'Schedule Management',
    description: 'Organize events, deadlines, and appointments with our intuitive calendar system.',
    color: '#10b981',
  },
  {
    icon: 'solar:users-group-rounded-bold-duotone',
    title: 'User Management',
    description: 'Manage team members, permissions, and roles with advanced user control features.',
    color: '#8b5cf6',
  },
  {
    icon: 'solar:chat-round-money-bold-duotone',
    title: 'Revenue Tracking',
    description: 'Monitor earnings, expenses, and financial performance with detailed reporting.',
    color: '#f59e0b',
  },
  {
    icon: 'solar:notification-unread-bold-duotone',
    title: 'Smart Notifications',
    description: 'Stay updated with real-time alerts, via email notifications, and mobile push updates.',
    color: '#ef4444',
  },
  {
    icon: 'solar:settings-bold-duotone',
    title: 'Easy Customization',
    description: 'Customize themes, layouts, and workflows to match your business needs perfectly.',
    color: '#64748b',
  },
];

// ----------------------------------------------------------------------

export function HomeFeatures({ sx, ...other }) {
  const renderHeading = () => (
    <Stack spacing={3} sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
      <m.div variants={varFade('inDown')}>
        <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1c1917' }}>
          Everything You Need to Manage Your Business
        </Typography>
      </m.div>

      <m.div variants={varFade('inDown')}>
        <Typography variant="h5" sx={{ color: '#57534e', maxWidth: 672, mx: 'auto' }}>
          Complete dashboard toolkit designed for modern businesses and teams
        </Typography>
      </m.div>
    </Stack>
  );

  const renderFeatures = () => (
    <Grid container spacing={4} sx={{ mb: 6 }}>
      {FEATURES.map((feature, index) => (
        <Grid key={feature.title} xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
          <m.div variants={varFade('inUp')}>
            <Card
              sx={{
                height: 1,
                p: 4,
                borderRadius: '16px',
                border: 'none',
                boxShadow:
                  '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                bgcolor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 220,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow:
                    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  mb: 3,
                  bgcolor: '#f8fafc',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.1)' },
                }}
              >
                <Iconify icon={feature.icon} width={32} sx={{ color: feature.color }} />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  mb: 2,
                  color: '#1c1917',
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#57534e',
                  lineHeight: 1.6,
                  flexGrow: 1,
                }}
              >
                {feature.description}
              </Typography>
            </Card>
          </m.div>
        </Grid>
      ))}
    </Grid>
  );

  const renderCTA = () => (
    <m.div variants={varFade('inUp')}>
      <Box sx={{ textAlign: 'center' }}>
        <Button
          size="large"
          variant="contained"
          startIcon={<Iconify icon="solar:widget-bold" />}
          endIcon={<Iconify icon="solar:arrow-right-outline" />}
          sx={{
            fontSize: '1.125rem',
            px: 6,
            py: 3,
            bgcolor: '#d97706',
            borderRadius: '16px',
            textTransform: 'none',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            '&:hover': {
              bgcolor: '#b45309',
              boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
            },
          }}
        >
          Build My Dashboard
        </Button>
      </Box>
    </m.div>
  );

  return (
    <Box
      component="section"
      sx={[
        {
          py: { xs: 10, md: 15 },
          background: 'linear-gradient(to bottom right, #fafaf9, rgba(217, 119, 6, 0.03))',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container component={MotionViewport} maxWidth="xl">
        {renderHeading()}
        {renderFeatures()}
        {renderCTA()}
      </Container>
    </Box>
  );
} 