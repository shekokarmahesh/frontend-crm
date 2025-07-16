import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Step from '@mui/material/Step';
import Alert from '@mui/material/Alert';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const STEPS = [
  {
    label: 'Basic Information',
    description: 'Tell us about yourself',
    icon: 'solar:user-bold',
  },
  {
    label: 'Visual Profile',
    description: 'Add your photos',
    icon: 'solar:camera-bold',
  },
  {
    label: 'Professional Details',
    description: 'Your expertise & style',
    icon: 'solar:star-bold',
  },
  {
    label: 'Bio & About',
    description: 'Share your story',
    icon: 'solar:document-text-bold',
  },
  {
    label: 'Experience',
    description: 'Your background',
    icon: 'solar:case-bold',
  },
];

// ----------------------------------------------------------------------

export function EnhancedProgressIndicator({ 
  activeStep, 
  hasCallingData, 
  callingData,
  totalSteps = 5 
}) {
  const progress = ((activeStep + 1) / totalSteps) * 100;

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        {/* Calling Data Notice */}
        {hasCallingData && (
          <Alert 
            severity="info" 
            sx={{ mb: 3, bgcolor: 'primary.lighter', color: 'primary.darker' }}
            icon={<Iconify icon="solar:phone-bold" />}
          >
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
              Welcome back! We found information from your previous interaction.
            </Typography>
            {callingData && (
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Practice: {callingData.practice_type} • Location: {callingData.location}
              </Typography>
            )}
          </Alert>
        )}

        {/* Progress Bar */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress)}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              }
            }} 
          />
        </Box>

        {/* Stepper */}
        <Stepper activeStep={activeStep} orientation="horizontal">
          {STEPS.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      bgcolor: activeStep >= index ? 'primary.main' : 'grey.300',
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      ...(activeStep === index && {
                        boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.2)',
                      }),
                    }}
                  >
                    {activeStep > index ? (
                      <Iconify icon="solar:check-circle-bold" width={16} />
                    ) : (
                      <Iconify icon={step.icon} width={16} />
                    )}
                  </Box>
                )}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontWeight: activeStep >= index ? 600 : 400,
                      color: activeStep >= index ? 'primary.main' : 'text.secondary',
                      display: 'block',
                      mb: 0.5
                    }}
                  >
                    {step.label}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: '0.7rem',
                      display: { xs: 'none', sm: 'block' }
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step Counter */}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Step {activeStep + 1} of {totalSteps}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

EnhancedProgressIndicator.propTypes = {
  activeStep: PropTypes.number.isRequired,
  hasCallingData: PropTypes.bool,
  callingData: PropTypes.object,
  totalSteps: PropTypes.number,
}; 