import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from '../../hooks';
import { getErrorMessage } from '../../utils';
import { FormHead } from '../../components/form-head';
import { JWT_STORAGE_KEY } from '../../context/jwt/constant';
import { 
  sendOTP, 
  verifyOTP, 
  storeOnboardingToken, 
  storeAuthToken 
} from 'src/services/api';

// ----------------------------------------------------------------------

// Phone number validation schema
export const PhoneSchema = zod.object({
  phone: zod
    .string()
    .min(1, { message: 'Phone number is required!' })
    .min(10, { message: 'Please enter a valid phone number!' })
    .regex(/^[\+]?[1-9][\d]{0,15}$/, { message: 'Please enter a valid phone number!' }),
});

// OTP validation schema
export const OTPSchema = zod.object({
  otp: zod
    .string()
    .min(1, { message: 'OTP is required!' })
    .length(6, { message: 'OTP must be 6 digits!' })
    .regex(/^\d{6}$/, { message: 'OTP must contain only numbers!' }),
});

// ----------------------------------------------------------------------

export function JwtPhoneAuthView() {
  const router = useRouter();
  const { checkUserSession } = useAuthContext();

  // State management
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [countdown, setCountdown] = useState(0);

  // Phone form
  const phoneForm = useForm({
    resolver: zodResolver(PhoneSchema),
    defaultValues: { phone: '' },
  });

  // OTP form
  const otpForm = useForm({
    resolver: zodResolver(OTPSchema),
    defaultValues: { otp: '' },
  });

  // Send OTP
  const onSendOTP = phoneForm.handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      // Clean phone number
      const cleanPhone = data.phone.trim();
      
      // Validate international format
      if (!cleanPhone.startsWith('+')) {
        throw new Error('Please enter phone number in international format (e.g., +1234567890)');
      }

      // Make real API call to send OTP
      const response = await sendOTP(cleanPhone);
      
      if (response.success) {
        setPhoneNumber(cleanPhone);
        setStep('otp');
        setSuccessMessage(response.message || `OTP sent to ${cleanPhone}`);
        
        // Start countdown
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        throw new Error(response.message || 'Failed to send OTP');
      }

    } catch (error) {
      console.error('Send OTP error:', error);
      setErrorMessage(error.error || error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  });

  // Verify OTP
  const onVerifyOTP = otpForm.handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      // Make real API call to verify OTP
      const response = await verifyOTP(phoneNumber, data.otp);
      
      if (response.success) {
        // Handle different user scenarios based on enhanced response
        if (response.needs_onboarding) {
          // User needs to complete onboarding (new or existing with calling data)
          
          // Clear any existing auth tokens to prevent conflicts
          localStorage.removeItem('jwt_access_token');
          sessionStorage.removeItem('jwt_access_token');
          
          // Store onboarding token
          storeOnboardingToken(response.token);
          
          // Store pre-filled data if available
          if (response.prefilled_data) {
            localStorage.setItem('prefilledData', JSON.stringify(response.prefilled_data));
          }
          
          // Store user data for onboarding
          sessionStorage.setItem('demo_user', JSON.stringify({
            id: response.practitioner_id || 'temp_user',
            phone: phoneNumber,
            is_new_user: response.is_new_user || false,
            onboarding_step: response.current_step || 1,
            has_calling_data: response.has_calling_data || false,
            calling_data: response.calling_data || null
          }));
          
          // Ensure token is stored before navigation
          setTimeout(() => {
            // Navigate to onboarding
            window.location.href = paths.onboarding;
          }, 100);
          
        } else {
          // Fully onboarded user - go directly to dashboard
          storeAuthToken(response.token);
          
          // Set the session using the correct storage key for existing auth context
          sessionStorage.setItem(JWT_STORAGE_KEY, response.token);
          
          // Store user data
          sessionStorage.setItem('demo_user', JSON.stringify({
            id: response.facilitator?.id || 'existing_user',
            email: response.facilitator?.email || 'user@example.com',
            displayName: response.facilitator?.name || 'User',
            phone: phoneNumber,
            role: 'admin',
            photoURL: null,
            accessToken: response.token,
            is_new_user: false,
            crm_onboarding_completed: response.facilitator?.crm_onboarding_completed || true
          }));
          
          // Navigate to dashboard
          window.location.href = paths.dashboard.root;
        }
      } else {
        throw new Error(response.message || 'Invalid OTP. Please try again.');
      }

    } catch (error) {
      console.error('Verify OTP error:', error);
      setErrorMessage(error.error || error.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  });

  // Resend OTP
  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      // Make real API call to resend OTP
      const response = await sendOTP(phoneNumber);
      
      if (response.success) {
        setSuccessMessage(response.message || `OTP resent to ${phoneNumber}`);
        
        // Restart countdown
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        throw new Error(response.message || 'Failed to resend OTP');
      }

    } catch (error) {
      console.error('Resend OTP error:', error);
      setErrorMessage(error.error || error.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to phone step
  const handleBackToPhone = () => {
    setStep('phone');
    setErrorMessage(null);
    setSuccessMessage(null);
    setCountdown(0);
    otpForm.reset();
  };

  // Render phone input form
  const renderPhoneForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Field.Text
        name="phone"
        label="Phone Number"
        placeholder="+1234567890"
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="solar:phone-bold" sx={{ color: '#d97706' }} />
              </InputAdornment>
            ),
          },
        }}
        helperText="Enter your phone number in international format"
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          bgcolor: '#d97706',
          '&:hover': { bgcolor: '#b45309' },
          py: 1.5,
        }}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Iconify icon="solar:arrow-right-bold" />}
      >
        {isLoading ? 'Sending OTP...' : 'Send OTP'}
      </Button>
    </Box>
  );

  // Render OTP verification form
  const renderOTPForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          We sent a 6-digit verification code to
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#d97706' }}>
          {phoneNumber}
        </Typography>
      </Box>

      <Field.Text
        name="otp"
        label="Verification Code"
        placeholder="123456"
        inputProps={{
          maxLength: 6,
          style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' },
        }}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="solar:shield-check-bold" sx={{ color: '#d97706' }} />
              </InputAdornment>
            ),
          },
        }}
        helperText="Enter the 6-digit code sent to your phone"
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          bgcolor: '#d97706',
          '&:hover': { bgcolor: '#b45309' },
          py: 1.5,
        }}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Iconify icon="solar:check-circle-bold" />}
      >
        {isLoading ? 'Verifying...' : 'Verify & Continue'}
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Button
          variant="text"
          onClick={handleBackToPhone}
          disabled={isLoading}
          startIcon={<Iconify icon="solar:arrow-left-bold" />}
          sx={{ color: 'text.secondary' }}
        >
          Change Number
        </Button>

        <Button
          variant="text"
          onClick={handleResendOTP}
          disabled={isLoading || countdown > 0}
          sx={{ color: countdown > 0 ? 'text.disabled' : '#d97706' }}
        >
          {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <FormHead
        title={step === 'phone' ? 'Welcome to Minimal UI' : 'Verify Your Phone'}
        description={
          step === 'phone' ? (
            <>
              {`Enter your phone number to get started. New here? `}
              <Link component={RouterLink} href={paths.dashboard.root} variant="subtitle2">
                Explore Dashboard
              </Link>
            </>
          ) : (
            'Please enter the verification code sent to your phone number'
          )
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {/* Success Message */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      {/* Error Message */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Forms */}
      {step === 'phone' ? (
        <Form methods={phoneForm} onSubmit={onSendOTP}>
          {renderPhoneForm()}
        </Form>
      ) : (
        <Form methods={otpForm} onSubmit={onVerifyOTP}>
          {renderOTPForm()}
        </Form>
      )}
    </>
  );
} 