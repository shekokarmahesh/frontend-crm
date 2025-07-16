import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const PREDEFINED_BANNERS = [
  {
    id: 'banner-1',
    url: '/assets/background/11.jpg',
    title: 'Wellness Studio',
  },
  {
    id: 'banner-2',
    url: '/assets/background/12.jpg',
    title: 'Meditation Space',
  },
  {
    id: 'banner-3',
    url: '/assets/background/13.jpg',
    title: 'Yoga Practice',
  },
  {
    id: 'banner-4',
    url: '/assets/background/14.jpg',
    title: 'Fitness Journey',
  },
  {
    id: 'banner-5',
    url: '/assets/background/15.jpg',
    title: 'Mindful Living',
  },
  {
    id: 'banner-6',
    url: '/assets/background/16.jpg',
    title: 'Peaceful Retreat',
  },
];

export function BannerGallery({ selected, onSelect }) {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Or choose from our gallery
      </Typography>

      <Grid container spacing={2}>
        {PREDEFINED_BANNERS.map((banner) => (
          <Grid key={banner.id} item xs={6} sm={4}>
            <Box
              onClick={() => onSelect(banner.url)}
              sx={{
                height: 100,
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                backgroundImage: `url(${banner.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&:hover': {
                  '&:before': {
                    opacity: 0.72,
                  },
                  '& .banner-title': {
                    opacity: 1,
                  },
                },
                '&:before': {
                  top: 0,
                  width: 1,
                  content: "''",
                  height: '100%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                  transition: (theme) => theme.transitions.create('opacity'),
                  opacity: selected === banner.url ? 0.72 : 0,
                },
                ...(selected === banner.url && {
                  outline: (theme) => `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2,
                }),
              }}
            >
              <Stack
                className="banner-title"
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: 1,
                  height: 1,
                  opacity: 0,
                  position: 'relative',
                  color: 'common.white',
                  transition: (theme) => theme.transitions.create('opacity'),
                }}
              >
                <Typography variant="subtitle2">{banner.title}</Typography>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 