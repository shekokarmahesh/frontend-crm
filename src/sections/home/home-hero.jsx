import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

const motionProps = {
  variants: varFade('inUp', { distance: 24 }),
};

export function HomeHero({ sx, ...other }) {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const renderContent = () => (
    <Stack spacing={{ xs: 3, md: 5 }}>
      <m.div {...motionProps}>
        <Typography
          variant="h1"
          sx={[
            (theme) => ({
              fontSize: {
                xs: '2rem',
                sm: '2.5rem',
                md: '3rem',
                lg: '4rem'
              },
              fontWeight: 'bold',
              lineHeight: { xs: 1.3, md: 1.2 },
              color: '#1c1917',
              maxWidth: { xs: '100%', md: 680 },
            }),
          ]}
        >
          Spend just{' '}
          <Box component="span" sx={{ color: '#d97706' }}>
            2 minutes
          </Box>{' '}
          to create your professional dashboard & streamline your workflow.
        </Typography>
      </m.div>

      <m.div {...motionProps}>
        <Typography
          variant="h5"
          sx={{
            color: '#57534e',
            lineHeight: 1.6,
            maxWidth: { xs: '100%', md: 512 },
            fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' }
          }}
        >
          No coding required. Just customize our pre-built components — we&apos;ll help you create a beautiful, 
          professional dashboard for your business.
        </Typography>
      </m.div>

      <m.div {...motionProps}>
        <Stack 
          spacing={{ xs: 1.5, sm: 2 }} 
          direction={{ xs: 'column', sm: 'row' }} 
          sx={{ maxWidth: { xs: '100%', md: 448 } }}
        >
          <Button
            component={RouterLink}
            href={paths.auth.jwt.phoneAuth}
            size="large"
            fullWidth={!mdUp}
            variant="contained"
            startIcon={<Iconify icon="solar:rocket-bold" width={24} />}
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              py: { xs: 1.5, md: 2 },
              px: { xs: 3, md: 4 },
              height: { xs: 48, md: 56 },
              bgcolor: '#d97706',
              borderRadius: '12px',
              textTransform: 'none',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
              '&:hover': {
                bgcolor: '#b45309',
                boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
              },
            }}
          >
            Start for Free
          </Button>

          <Button
            component={RouterLink}
            href={paths.dashboard.root}
            color="inherit"
            size="large"
            fullWidth={!mdUp}
            variant="outlined"
            startIcon={<Iconify icon="solar:play-circle-outline" width={24} />}
            sx={{
              height: { xs: 48, md: 56 },
              borderRadius: '12px',
              textTransform: 'none',
              borderColor: '#d4d4d8',
              color: '#57534e',
              fontSize: { xs: '1rem', md: '1.125rem' },
              '&:hover': {
                borderColor: '#d97706',
                color: '#d97706',
              },
            }}
          >
            View Demo
          </Button>
        </Stack>
      </m.div>

      <m.div {...motionProps}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
          <Iconify icon="solar:check-circle-bold" width={{ xs: 16, md: 20 }} sx={{ color: '#d97706' }} />
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#57534e',
              fontSize: { xs: '0.875rem', md: '1rem' },
              lineHeight: 1.5
            }}
          >
            No payment required • Live in 2 minutes • Professional templates
          </Typography>
        </Stack>
      </m.div>
    </Stack>
  );

  const renderMockup = () => (
    <Stack 
      direction={{ xs: 'column', md: 'row' }} 
      spacing={{ xs: 3, md: 4 }} 
      alignItems="center" 
      justifyContent="center"
      sx={{ mt: { xs: 4, md: 0 } }}
    >
      {/* Desktop Mockup */}
      <Box
        sx={{
          position: 'relative',
          transform: { xs: 'none', md: 'rotate(-2deg)' },
          '&:hover': { transform: { xs: 'scale(1.02)', md: 'rotate(0deg) scale(1.05)' } },
          transition: 'transform 0.3s ease',
          width: { xs: '100%', sm: '80%', md: 'auto' }
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: 400, lg: 500 },
            bgcolor: '#1f2937',
            borderRadius: '12px',
            p: 1.5,
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          }}
        >
          {/* Browser Header */}
          <Box sx={{ bgcolor: '#374151', borderRadius: '8px', p: 1, mb: 1 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f87171' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#fbbf24' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#34d399' }} />
            </Stack>
            <Box
              sx={{
                bgcolor: '#4b5563',
                borderRadius: '4px',
                fontSize: '10px',
                color: '#d1d5db',
                px: 1,
                py: 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box sx={{ width: 8, height: 8, bgcolor: '#10b981', borderRadius: '50%' }} />
              <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                your-dashboard.minimal.cc
              </Typography>
              <Iconify icon="solar:global-outline" width={12} />
            </Box>
          </Box>

          {/* Website Content Preview */}
          <Box sx={{ bgcolor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
            <Box sx={{ height: { xs: 200, md: 300 }, overflowY: 'auto' }}>
              {/* Hero banner */}
              <Box sx={{ position: 'relative', height: 80 }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=100&fit=crop"
                  alt="banner"
                  sx={{ width: 1, height: 1, objectFit: 'cover', opacity: 0.6 }}
                />
                <Box
                  sx={(theme) => ({
                    position: 'absolute',
                    inset: 0,
                    bgcolor: alpha(theme.palette.warning.main, 0.24),
                  })}
                />
                <Stack alignItems="center" justifyContent="center" sx={{ position: 'absolute', inset: 0 }}>
                  <Typography variant="overline" sx={{ fontWeight: 700, color: 'common.white', letterSpacing: 1 }}>
                    Mindful Yoga Practice
                  </Typography>
                  <Button
                    size="small"
                    sx={(theme) => ({
                      mt: 0.5,
                      minHeight: 18,
                      bgcolor: theme.palette.warning.light,
                      color: theme.palette.warning.darker,
                      '&:hover': { bgcolor: theme.palette.warning.main },
                    })}
                  >
                    Start Journey
                  </Button>
                </Stack>
              </Box>

              {/* Offerings grid */}
              <Box sx={(theme) => ({ p: theme.spacing(1.5) })}>
                <Typography variant="caption" sx={{ fontSize: 10, fontWeight: 700, color: '#d97706', display: 'block', textAlign: 'center', mb: 1 }}>
                  Offerings & Courses
                </Typography>
                <Grid container spacing={1}>
                  {[
                    { title: 'Pranayama', price: '₹1,500' },
                    { title: 'Mindful Yoga', price: '₹2,000' },
                    { title: 'Meditation', price: '₹1,200' },
                    { title: 'Therapy', price: '₹2,500' },
                    { title: 'Nutrition Guide', price: '₹1,800' },
                    { title: 'Stress Relief', price: '₹1,400' },
                    
                  ].map((o, idx) => (
                    <Grid key={idx} xs={6}>
                      <Box
                        sx={(theme) => ({
                          p: theme.spacing(0.75),
                          borderRadius: 1,
                          bgcolor: theme.palette.grey[100],
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          gap: 0.25,
                        })}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: 9 }}>
                          {o.title}
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: 8, color: 'text.secondary' }}>
                          60 min
                        </Typography>
                        <Typography variant="caption" sx={(theme)=>({ fontSize: 8, fontWeight: 700, color: theme.palette.warning.dark })}>
                          {o.price}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Profile snippet */}
              <Box sx={(theme) => ({ p: theme.spacing(1.5), bgcolor: theme.palette.warning.lighter })}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box component="img" src="/1.png" alt="profile" sx={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }} />
                  <Box>
                    <Typography variant="caption" sx={{ fontSize: 9, fontWeight: 700, color: theme=>theme.palette.warning.darker }}>
                      Dr. Priya Sharma
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: 8, color: theme=>theme.palette.warning.dark, display:'block' }}>
                      Certified Yoga Therapist & Wellness Expert
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt:0.25 }}>
                      <Iconify icon="solar:star-bold" width={8} sx={{ color: '#fbbf24' }} />
                      <Typography variant="caption" sx={{ fontSize: 8, color: theme=>theme.palette.warning.dark }}>
                        4.9
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: 8, color: theme=>theme.palette.warning.dark }}>
                        • 200+ sessions • 5+ years
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt:0.25 }}>
                      <Iconify icon="solar:map-point-outline" width={8} sx={{ color: theme=>theme.palette.warning.dark }} />
                      <Typography variant="caption" sx={{ fontSize: 8, color: theme=>theme.palette.warning.dark }}>
                        Mumbai, India
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Box>

            </Box>
          </Box>
        </Box>
      </Box>

      {/* Mobile Mockup */}
      <Box
        sx={{
          transform: { xs: 'none', md: 'rotate(3deg)' },
          '&:hover': { transform: { xs: 'scale(1.02)', md: 'rotate(0deg) scale(1.05)' } },
          transition: 'transform 0.3s ease',
          display: { xs: 'none', sm: 'block' },
          width: { xs: '60%', md: 'auto' }
        }}
      >
        <Box
          sx={{
            width: 160,
            bgcolor: '#111827',
            borderRadius: '16px',
            p: 1,
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          }}
        >
          <Box sx={(theme) => ({ bgcolor: theme.palette.common.black, borderRadius: 2, overflow: 'hidden' })}>
            {/* Mobile Status Bar */}
            <Box
              sx={{
                bgcolor: 'white',
                px: 1,
                py: 0.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '10px',
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                9:41
              </Typography>
              <Stack direction="row" spacing={0.5}>
                <Iconify icon="solar:wifi-router-outline" width={8} />
                <Iconify icon="solar:signal-outline" width={8} />
                <Iconify icon="solar:battery-charge-outline" width={8} />
              </Stack>
            </Box>

            {/* Mobile Website Preview */}
            <Box sx={(theme) => ({ bgcolor: theme.palette.common.white, height: 200, overflowY: 'auto' })}>
               {/* App header */}
               <Box sx={(theme)=>({
                 bgcolor: theme.palette.grey[100],
                 px:1,
                 py:0.5,
                 display:'flex',
                 alignItems:'center',
                 justifyContent:'space-between',
                 borderBottom:`1px solid ${theme.palette.divider}`,
               })}>
                 <Typography variant="caption" sx={{fontWeight:700,fontSize:8}}>Ahoum</Typography>
                 <Iconify icon="solar:menu-dots-bold" width={10} />
               </Box>

               {/* mini hero */}
              <Box sx={{ position: 'relative', height: 48 }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1588286840104-8957b019727f?w=200&h=60&fit=crop"
                  alt="banner"
                  sx={{ width: 1, height: 1, objectFit: 'cover', opacity: 0.6 }}
                />
                <Box sx={(theme) => ({ position: 'absolute', inset: 0, bgcolor: alpha(theme.palette.warning.main, 0.24) })} />
                <Stack alignItems="center" justifyContent="center" sx={{ position: 'absolute', inset: 0 }}>
                  <Typography variant="overline" sx={{ color: 'common.white', fontWeight: 700 }}>
                    Yoga Journey
                  </Typography>
                </Stack>
              </Box>

              {/* offerings list */}
              <Box sx={{ p: 1 }}>
                <Stack spacing={0.5}>
                  {[
                    { title: 'Pranayama', price: '₹1,500' },
                    { title: 'Meditation', price: '₹1,200' },
                    { title: 'Yoga Flow', price: '₹2,000' },
                  ].map((o, i) => (
                    <Box key={i} sx={(theme) => ({
                      p: 0.75,
                      borderRadius: 1,
                      bgcolor: theme.palette.grey[100],
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    })}>
                      <Typography variant="caption" sx={{ fontSize: 8, fontWeight: 600 }}>
                        {o.title}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: 8, color: 'text.secondary' }}>
                        {o.price}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>

               {/* Footer navigation */}
               <Box sx={(theme)=>({
                 mt:1,
                 px:1,
                 py:0.5,
                 borderTop:`1px solid ${theme.palette.divider}`,
                 display:'flex',
                 justifyContent:'space-around',
               })}>
                 {['solar:home-2-bold','solar:search-bold','solar:user-bold'].map((ic,i)=>(
                   <Iconify key={i} icon={ic} width={12} sx={{color: theme=>theme.palette.text.secondary}} />
                 ))}
               </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );

  return (
    <Box
      component="section"
      sx={[
        {
          overflow: 'hidden',
          position: 'relative',
          py: { xs: 4, sm: 6, md: 8, lg: 12 },
          px: { xs: 2, sm: 3, md: 4 },
          background: 'linear-gradient(to bottom right, #fafaf9, rgba(217, 119, 6, 0.05))',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container component={MotionContainer} maxWidth="xl">
        <Grid 
          container 
          spacing={{ xs: 4, md: 8 }} 
          alignItems="center" 
          sx={{ 
            minHeight: { xs: 'auto', md: '600px' },
            flexDirection: { xs: 'column-reverse', lg: 'row' }
          }}
        >
          <Grid item xs={12} lg={6}>
            {renderContent()}
          </Grid>
          <Grid item xs={12} lg={6}>
            {renderMockup()}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 