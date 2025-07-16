import React, { useState } from 'react';

import {
  Box,
  Card,
  Chip,
  Alert,
  Stack,
  Button,
  Dialog,
  Tooltip,
  TextField,
  IconButton,
  Typography,
  CardContent,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress
} from '@mui/material';

import { initiateCourseCalls } from 'src/services/api';

import { Iconify } from 'src/components/iconify';

export default function CourseCallDialog({ open, onClose, course, onCallInitiated }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [callResult, setCallResult] = useState(null);

  const handleCall = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter a phone number');
      return;
    }

    // Basic phone number validation
    const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const response = await initiateCourseCalls(course.id, {
        phone_number: cleanPhone
      });
      
      if (response.success) {
        setCallResult(response);
        setSuccess('Course promotion call initiated successfully!');
        
        // Notify parent component
        if (onCallInitiated) {
          onCallInitiated(response);
        }
        
        // Auto-close after showing success for 3 seconds
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        setError(response.error || 'Failed to initiate call');
      }
    } catch (err) {
      setError(err.message || 'Failed to initiate call');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after a short delay
    setTimeout(() => {
      setPhoneNumber('');
      setError('');
      setSuccess('');
      setCallResult(null);
    }, 300);
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits except +
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // If it starts with +, keep it
    if (cleaned.startsWith('+')) {
      return cleaned;
    }
    
    // If it starts with 1 and is US number, add +
    if (cleaned.startsWith('1') && cleaned.length === 11) {
      return '+' + cleaned;
    }
    
    // If it's 10 digits, assume US number
    if (cleaned.length === 10) {
      return '+1' + cleaned;
    }
    
    return cleaned;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    if (error) setError(''); // Clear error when user starts typing
  };

  const insertSampleNumber = () => {
    setPhoneNumber('+1234567890');
    if (error) setError('');
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="eva:phone-call-fill" sx={{ color: 'primary.main' }} />
          <Typography variant="h6">
            AI Course Promotion Call
          </Typography>
        </Stack>
      </DialogTitle>
      
      <DialogContent>
        {/* Course Info Card */}
        {course && (
          <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
            <CardContent sx={{ pb: 2 }}>
              <Typography variant="subtitle1" gutterBottom color="primary">
                📚 Course to Promote:
              </Typography>
              <Stack spacing={1}>
                <Typography variant="h6">{course.title}</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip 
                    label={`📅 ${course.timing}`} 
                    size="small" 
                    variant="outlined"
                  />
                  <Chip 
                    label={`📋 ${course.prerequisite || 'Open to all'}`} 
                    size="small" 
                    variant="outlined"
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            🤖 The AI agent will call this number to promote your course and encourage registration.
          </Typography>
          <Typography variant="body2" color="primary">
            💡 Make sure the number is available to receive calls right now.
          </Typography>
        </Box>
        
        {/* Phone Number Input */}
        <Stack spacing={2}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="flex-end">
              <TextField
                fullWidth
                label="Student Phone Number"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={handlePhoneChange}
                disabled={loading}
                error={!!error}
                helperText={error || 'Include country code (e.g., +1 for US)'}
                InputProps={{
                  startAdornment: (
                    <Iconify icon="eva:phone-fill" sx={{ mr: 1, color: 'text.secondary' }} />
                  ),
                }}
              />
              <Tooltip title="Insert sample number for testing">
                <IconButton 
                  onClick={insertSampleNumber}
                  disabled={loading}
                  sx={{ mb: 2 }}
                >
                  <Iconify icon="eva:edit-fill" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          {/* Call Details Preview */}
          {phoneNumber && !error && (
            <Card sx={{ bgcolor: 'info.lighter', border: '1px solid', borderColor: 'info.light' }}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  📞 Call Preview:
                </Typography>
                <Typography variant="body2">
                  • Agent: <strong>Omee from Ahoum</strong>
                </Typography>
                <Typography variant="body2">
                  • Purpose: <strong>Promote &quot;{course?.title}&quot; course</strong>
                </Typography>
                <Typography variant="body2">
                  • Phone: <strong>{phoneNumber}</strong>
                </Typography>
                <Typography variant="body2">
                  • Expected duration: <strong>2-5 minutes</strong>
                </Typography>
              </CardContent>
            </Card>
          )}
        </Stack>

        {/* Success/Error Messages */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            <Stack spacing={1}>
              <Typography variant="body2">
                {success}
              </Typography>
              {callResult && (
                <Box>
                  <Typography variant="caption" display="block">
                    Call ID: {callResult.call_id}
                  </Typography>
                  {callResult.room_name && (
                    <Typography variant="caption" display="block">
                      Room: {callResult.room_name}
                    </Typography>
                  )}
                </Box>
              )}
            </Stack>
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <Card sx={{ mt: 2, bgcolor: 'warning.lighter' }}>
            <CardContent sx={{ py: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <CircularProgress size={24} />
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Initiating AI Call...
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Setting up LiveKit room and connecting agent
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={handleClose} 
          disabled={loading}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleCall} 
          variant="contained" 
          disabled={loading || !phoneNumber.trim() || !!error}
          startIcon={loading ? <CircularProgress size={16} /> : <Iconify icon="eva:phone-call-fill" />}
          sx={{ minWidth: 140 }}
        >
          {loading ? 'Calling...' : 'Start AI Call'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}