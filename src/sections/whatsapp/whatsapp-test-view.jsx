import { useState, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Chip,
  Grid,
  Alert,
  Stack,
  Button,
  Divider,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';

import { testWhatsApp, getWhatsAppStatus } from 'src/services/api';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function WhatsAppTestView() {
  const [status, setStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [testData, setTestData] = useState({
    testNumber: '',
    testMessage: 'Hello! This is a test message from Ahoum. 🎯',
  });
  const [testLoading, setTestLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWhatsAppStatus();
  }, []);

  const fetchWhatsAppStatus = async () => {
    try {
      setStatusLoading(true);
      setError(null);
      const response = await getWhatsAppStatus();
      if (response.success) {
        setStatus(response.data);
      } else {
        setError(response.message || 'Failed to get WhatsApp status');
      }
    } catch (err) {
      setError(err.message || 'Failed to get WhatsApp status');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleTestMessage = async () => {
    if (!testData.testNumber.trim()) {
      setError('Please enter a test phone number');
      return;
    }

    try {
      setTestLoading(true);
      setError(null);
      setTestResult(null);

      const response = await testWhatsApp(testData);
      if (response.success) {
        setTestResult(response.data);
      } else {
        setError(response.message || 'Failed to send test message');
      }
    } catch (err) {
      setError(err.message || 'Failed to send test message');
    } finally {
      setTestLoading(false);
    }
  };

  const getStatusColor = (connectionStatus) => {
    switch (connectionStatus) {
      case 'connected':
        return 'success';
      case 'disconnected':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">WhatsApp Integration Test</Typography>
        <Button
          variant="outlined"
          startIcon={<Iconify icon="eva:refresh-fill" />}
          onClick={fetchWhatsAppStatus}
          disabled={statusLoading}
        >
          Refresh Status
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* WhatsApp Status */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: 'fit-content' }}>
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Iconify icon="logos:whatsapp-icon" sx={{ fontSize: 32 }} />
                <Typography variant="h6">WhatsApp Status</Typography>
              </Stack>

              {statusLoading ? (
                <Box display="flex" justifyContent="center" py={3}>
                  <CircularProgress />
                </Box>
              ) : status ? (
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2">Connection Status:</Typography>
                    <Chip
                      label={status.connection_status}
                      color={getStatusColor(status.connection_status)}
                      size="small"
                    />
                  </Stack>

                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2">Session Name:</Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {status.session_name}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2">Phone Number:</Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {status.phone_number}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2">API Key Status:</Typography>
                    <Chip
                      label={status.api_key_status}
                      color={status.api_key_status === 'valid' ? 'success' : 'error'}
                      size="small"
                    />
                  </Stack>

                  {status.messages_sent_today !== undefined && (
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="body2">Messages Today:</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {status.messages_sent_today}
                      </Typography>
                    </Stack>
                  )}

                  {status.session_uptime && (
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="body2">Session Uptime:</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {status.session_uptime}
                      </Typography>
                    </Stack>
                  )}

                  {status.last_activity && (
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="body2">Last Activity:</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {new Date(status.last_activity).toLocaleString()}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              ) : (
                <Alert severity="warning">
                  Unable to fetch WhatsApp status
                </Alert>
              )}
            </Stack>
          </Card>
        </Grid>

        {/* Test Message */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Iconify icon="eva:message-square-fill" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Send Test Message</Typography>
              </Stack>

              <TextField
                label="Test Phone Number"
                value={testData.testNumber}
                onChange={(e) => setTestData((prev) => ({ ...prev, testNumber: e.target.value }))}
                placeholder="+919876543210"
                fullWidth
                helperText="Enter phone number with country code"
              />

              <TextField
                label="Test Message"
                value={testData.testMessage}
                onChange={(e) => setTestData((prev) => ({ ...prev, testMessage: e.target.value }))}
                multiline
                rows={3}
                fullWidth
                helperText="Customize your test message"
              />

              <LoadingButton
                variant="contained"
                onClick={handleTestMessage}
                loading={testLoading}
                startIcon={<Iconify icon="eva:paper-plane-fill" />}
                disabled={!testData.testNumber.trim()}
              >
                Send Test Message
              </LoadingButton>

              {testResult && (
                <>
                  <Divider />
                  <Alert severity="success">
                    <Typography variant="subtitle2" gutterBottom>
                      Test message sent successfully!
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        • Message ID: {testResult.message_id}
                      </Typography>
                      <Typography variant="body2">
                        • Response Time: {testResult.response_time}
                      </Typography>
                      <Typography variant="body2">
                        • Recipient: {testResult.test_recipient}
                      </Typography>
                    </Stack>
                  </Alert>
                </>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Instructions */}
      <Card sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          💡 Instructions
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">
            • Make sure your backend server is running and WhatsApp integration is configured
          </Typography>
          <Typography variant="body2">
            • The phone number should include country code (e.g., +91 for India)
          </Typography>
          <Typography variant="body2">
            • Test messages help verify that your WhatsApp API is working correctly
          </Typography>
          <Typography variant="body2">
            • If the connection status shows &quot;disconnected&quot;, check your API configuration
          </Typography>
        </Stack>
      </Card>
    </Container>
  );
} 