import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

const STEPS = [
  {
    number: '1',
    title: 'Sign Up',
    description: 'Create your account in less than 2 minutes',
    icon: 'solar:user-plus-bold-duotone',
    color: '#3b82f6',
  },
  {
    number: '2',
    title: 'Customize',
    description: 'Personalize your dashboard to match your needs',
    icon: 'solar:settings-bold-duotone',
    color: '#10b981',
  },
  {
    number: '3',
    title: 'Import Data',
    description: 'Connect your existing tools and import your data',
    icon: 'solar:database-bold-duotone',
    color: '#8b5cf6',
  },
  {
    number: '4',
    title: 'Go Live',
    description: 'Start managing your business with powerful analytics',
    icon: 'solar:rocket-bold-duotone',
    color: '#f59e0b',
  },
];

// ----------------------------------------------------------------------

export function HomeProcess({ sx, ...other }) {
  const renderHeading = () => (
    <Stack spacing={3} sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
      <m.div variants={varFade('inDown')}>
        <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1c1917' }}>
          How It Works
        </Typography>
      </m.div>

      <m.div variants={varFade('inDown')}>
        <Typography variant="h5" sx={{ color: '#57534e', maxWidth: 672, mx: 'auto' }}>
          Get up and running with your professional dashboard in just a few simple steps
        </Typography>
      </m.div>
    </Stack>
  );

  const renderSteps = () => (
    <Grid container spacing={4} alignItems="center" justifyContent="center">
      {STEPS.map((step, index) => (
        <Grid key={step.title} xs={12} md={3}>
          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Box sx={{ textAlign: 'center', position: 'relative' }}>
              {/* Step Number Circle */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 3,
                  bgcolor: 'white',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                  border: `2px solid ${step.color}`,
                  position: 'relative',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.1)' },
                }}
              >
                <Iconify icon={step.icon} width={36} sx={{ color: step.color }} />
                
                {/* Step Number Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    width: 24,
                    height: 24,
                    bgcolor: step.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid white',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                    }}
                  >
                    {step.number}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  fontSize: '1.25rem',
                  color: '#1c1917',
                }}
              >
                {step.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  color: '#57534e',
                  lineHeight: 1.6,
                  maxWidth: 200,
                  mx: 'auto',
                }}
              >
                {step.description}
              </Typography>

              {/* Arrow Connector */}
              {index < STEPS.length - 1 && (
                <Iconify
                  icon="solar:arrow-right-outline"
                  width={24}
                  sx={{
                    color: '#9ca3af',
                    position: 'absolute',
                    top: 40,
                    right: { xs: '50%', md: -16 },
                    transform: { xs: 'translateX(50%) rotate(90deg)', md: 'none' },
                    display: { xs: 'none', md: 'block' },
                  }}
                />
              )}
            </Box>
          </m.div>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box
      component="section"
      sx={[
        {
          py: { xs: 10, md: 15 },
          bgcolor: 'white',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container component={MotionViewport} maxWidth="xl">
        {renderHeading()}
        {renderSteps()}
      </Container>
    </Box>
  );
} 