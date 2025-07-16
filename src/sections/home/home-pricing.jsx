import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

const PLANS = [
  {
    title: 'Basic',
    price: '$29',
    period: '/month',
    popular: false,
    features: [
      'Up to 5 team members',
      'Basic dashboard analytics',
      'Email support',
      '10GB cloud storage',
      'Mobile app access',
    ],
    color: '#6b7280',
    buttonText: 'Get Started',
    description: 'Perfect for small teams getting started',
  },
  {
    title: 'Professional',
    price: '$79',
    period: '/month',
    popular: true,
    features: [
      'Up to 25 team members',
      'Advanced analytics & reporting',
      'Priority support',
      '100GB cloud storage',
      'Mobile & desktop apps',
      'Custom integrations',
      'Advanced user permissions',
    ],
    color: '#d97706',
    buttonText: 'Start Free Trial',
    description: 'Most popular choice for growing businesses',
  },
  {
    title: 'Enterprise',
    price: '$199',
    period: '/month',
    popular: false,
    features: [
      'Unlimited team members',
      'Enterprise analytics suite',
      '24/7 dedicated support',
      'Unlimited cloud storage',
      'Full platform access',
      'Custom integrations',
      'Advanced security features',
      'Dedicated account manager',
    ],
    color: '#1f2937',
    buttonText: 'Contact Sales',
    description: 'Complete solution for large organizations',
  },
];

// ----------------------------------------------------------------------

export function HomePricing({ sx, ...other }) {
  const renderHeading = () => (
    <Stack spacing={3} sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
      <m.div variants={varFade('inDown')}>
        <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1c1917' }}>
          Simple, Transparent Pricing
        </Typography>
      </m.div>

      <m.div variants={varFade('inDown')}>
        <Typography variant="h5" sx={{ color: '#57534e', maxWidth: 672, mx: 'auto' }}>
          Choose the perfect plan for your business needs. Upgrade or downgrade at any time.
        </Typography>
      </m.div>
    </Stack>
  );

  const renderPlans = () => (
    <Grid container spacing={4} justifyContent="center">
      {PLANS.map((plan, index) => (
        <Grid key={plan.title} xs={12} md={4}>
          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Card
              sx={{
                p: 4,
                height: '100%',
                position: 'relative',
                borderRadius: '16px',
                border: plan.popular ? '2px solid #d97706' : '1px solid #e5e7eb',
                boxShadow: plan.popular 
                  ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
                  : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                bgcolor: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {plan.popular && (
                <Chip
                  label="Most Popular"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: '#d97706',
                    color: 'white',
                    fontWeight: 600,
                    '&:hover': { bgcolor: '#b45309' },
                  }}
                />
              )}

              <Stack spacing={3} sx={{ height: '100%' }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: '#1c1917',
                      mb: 1,
                    }}
                  >
                    {plan.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#57534e',
                      mb: 2,
                    }}
                  >
                    {plan.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 'bold',
                        color: plan.color,
                      }}
                    >
                      {plan.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#57534e',
                      }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  size="large"
                  variant={plan.popular ? 'contained' : 'outlined'}
                  component={RouterLink}
                  href="/dashboard"
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    ...(plan.popular
                      ? {
                          bgcolor: '#d97706',
                          '&:hover': { bgcolor: '#b45309' },
                        }
                      : {
                          borderColor: '#d4d4d8',
                          color: '#57534e',
                          '&:hover': {
                            borderColor: '#d97706',
                            color: '#d97706',
                          },
                        }),
                  }}
                >
                  {plan.buttonText}
                </Button>

                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: '#1c1917',
                      borderBottom: '1px solid #e5e7eb',
                      pb: 1,
                    }}
                  >
                    What&apos;s included:
                  </Typography>
                  {plan.features.map((feature, featureIndex) => (
                    <Stack key={featureIndex} direction="row" spacing={1} alignItems="center">
                      <Iconify
                        icon="solar:check-circle-bold"
                        width={20}
                        sx={{ color: '#10b981', flexShrink: 0 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#57534e',
                        }}
                      >
                        {feature}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </m.div>
        </Grid>
      ))}
    </Grid>
  );

  const renderFAQ = () => (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <m.div variants={varFade('inUp')}>
        <Typography variant="body1" sx={{ color: '#57534e', mb: 2 }}>
          Have questions? We&apos;re here to help.
        </Typography>
        <Button
          variant="text"
          endIcon={<Iconify icon="solar:arrow-right-outline" />}
          sx={{
            color: '#d97706',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { bgcolor: 'transparent', color: '#b45309' },
          }}
        >
          View FAQ & Support
        </Button>
      </m.div>
    </Box>
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
        {renderPlans()}
        {renderFAQ()}
      </Container>
    </Box>
  );
} 