import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

// Icons
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export function MeditationBanner() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 3,
        width: 1,
        position: 'relative',
        backgroundImage: (theme) =>
          `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(
            theme.palette.primary.main,
            0.08
          )})`,
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={3}>
        {/* Live Indicator */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'success.main',
              boxShadow: (theme) => `0 0 8px ${theme.palette.success.main}`,
            }}
          />
          <Typography variant="subtitle2" sx={{ color: 'success.main' }}>
            LIVE
          </Typography>
        </Box>

        {/* Title and Info */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Morning Meditation & Breathwork
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2.5}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TimerOutlinedIcon sx={{ width: 16, height: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                23 min remaining
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <PeopleOutlinedIcon sx={{ width: 16, height: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                12 participants
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<VisibilityOutlinedIcon />}
            sx={{ borderColor: alpha(theme.palette.grey[500], 0.24) }}
          >
            View Details
          </Button>
          
          <Button variant="contained" color="primary">
            Join Session
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
} 