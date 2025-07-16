import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'CEO at TechStart',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    review: 'This dashboard completely transformed how we manage our business. The analytics are incredibly detailed and the interface is so intuitive. Our team productivity increased by 40% since we started using it.',
    company: 'TechStart Inc.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Operations Director',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    review: 'The best investment we made this year. The customer support is outstanding and the features are exactly what we needed. Implementation was seamless and the results were immediate.',
    company: 'GrowthCorp',
  },
  {
    name: 'Emily Johnson',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    review: 'I\'ve tried many dashboard solutions, but this one stands out. The customization options are endless and the performance is exceptional. Highly recommend for any growing business.',
    company: 'InnovateLab',
  },
];

// ----------------------------------------------------------------------

export function HomeTestimonials({ sx, ...other }) {
  const renderHeading = () => (
    <Stack spacing={3} sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
      <m.div variants={varFade('inDown')}>
        <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1c1917' }}>
          Trusted by Teams Worldwide
        </Typography>
      </m.div>

      <m.div variants={varFade('inDown')}>
        <Typography variant="h5" sx={{ color: '#57534e', maxWidth: 672, mx: 'auto' }}>
          See what our customers are saying about their experience with our dashboard
        </Typography>
      </m.div>
    </Stack>
  );

  const renderTestimonials = () => (
    <Grid container spacing={4}>
      {TESTIMONIALS.map((testimonial, index) => (
        <Grid key={testimonial.name} xs={12} md={4}>
          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Card
              sx={{
                p: 4,
                height: '100%',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                bgcolor: 'white',
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {/* Quote Icon */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -12,
                  left: 16,
                  width: 24,
                  height: 24,
                  bgcolor: '#d97706',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify
                  icon="solar:quote-up-bold"
                  width={12}
                  sx={{ color: 'white' }}
                />
              </Box>

              <Stack spacing={3} sx={{ height: '100%' }}>
                {/* Rating */}
                <Rating
                  value={testimonial.rating}
                  readOnly
                  size="small"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#fbbf24',
                    },
                  }}
                />

                {/* Review Text */}
                <Typography
                  variant="body1"
                  sx={{
                    color: '#374151',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    flexGrow: 1,
                  }}
                >
                  &ldquo;{testimonial.review}&rdquo;
                </Typography>

                {/* Author Info */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{
                      width: 48,
                      height: 48,
                      border: '2px solid #e5e7eb',
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: '#1c1917',
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#57534e',
                      }}
                    >
                      {testimonial.role}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#9ca3af',
                        fontSize: '0.75rem',
                      }}
                    >
                      {testimonial.company}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </m.div>
        </Grid>
      ))}
    </Grid>
  );

  const renderStats = () => (
    <Box sx={{ mt: 8, textAlign: 'center' }}>
      <m.div variants={varFade('inUp')}>
        <Grid container spacing={4} justifyContent="center">
          {[
            { value: '10,000+', label: 'Active Users' },
            { value: '99.9%', label: 'Uptime' },
            { value: '4.9/5', label: 'Customer Rating' },
            { value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <Grid key={stat.label} xs={6} md={3}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    color: '#d97706',
                    mb: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#57534e',
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </m.div>
    </Box>
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
        {renderTestimonials()}
        {renderStats()}
      </Container>
    </Box>
  );
} 