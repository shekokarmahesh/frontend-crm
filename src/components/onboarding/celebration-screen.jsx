import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';
import { ViewWebsiteButton } from 'src/components/website';

// ----------------------------------------------------------------------

export function CelebrationScreen({ onContinue, userProfile }) {
  // Simple confetti effect using CSS animation
  useEffect(() => {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    
    // Create confetti pieces
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationName = 'confetti-fall';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.animationTimingFunction = 'ease-in-out';
      confetti.style.animationIterationCount = 'infinite';
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confettiContainer.appendChild(confetti);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confetti-fall {
        0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(confettiContainer);
    
    // Cleanup
    return () => {
      document.body.removeChild(confettiContainer);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card
        sx={{
          p: 4,
          textAlign: 'center',
          background: (theme) => 
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.1)} 100%)`,
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Success Icon */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 120,
              height: 120,
              borderRadius: '50%',
              bgcolor: 'success.main',
              color: 'white',
              mb: 4,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)' },
              },
            }}
          >
            <Iconify icon="solar:check-circle-bold" width={60} />
          </Box>

          {/* Congratulations Message */}
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'success.main' }}>
            🎉 Congratulations!
          </Typography>
          
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Welcome to Minimal UI, {userProfile?.firstName || 'User'}!
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            Your profile has been successfully created. You&apos;re all set to start your journey with us!
          </Typography>

          {/* Success Stats */}
          <Stack 
            direction="row" 
            spacing={4} 
            justifyContent="center" 
            sx={{ mb: 4 }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                5
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Steps Completed
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                100%
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Profile Complete
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                1
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                New Journey
              </Typography>
            </Box>
          </Stack>

          {/* Next Steps */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              What&apos;s Next?
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ✨ Explore your personalized dashboard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                🌐 Preview your professional website
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                📊 View analytics and insights
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                🎯 Start managing your activities
              </Typography>
            </Stack>
          </Box>

          {/* Action Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <ViewWebsiteButton
              variant="outlined"
              size="large"
              sx={{
                py: 2,
                px: 4,
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: 2,
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={onContinue}
              startIcon={<Iconify icon="solar:arrow-right-bold" />}
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: 2,
                background: (theme) => 
                  `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                '&:hover': {
                  background: (theme) => 
                    `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                },
              }}
            >
              Continue to Dashboard
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

CelebrationScreen.propTypes = {
  onContinue: PropTypes.func.isRequired,
  userProfile: PropTypes.object,
}; 