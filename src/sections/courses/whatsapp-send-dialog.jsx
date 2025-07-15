import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  Alert,
  Chip,
  Box,
  Divider,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { Iconify } from 'src/components/iconify';
import { sendCourseWhatsApp, sendCourseToAllStudents } from 'src/services/api';

// ----------------------------------------------------------------------

export default function WhatsAppSendDialog({ open, course, onClose }) {
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSendToNumbers = async () => {
    if (!phoneNumbers.trim()) {
      setError('Please enter at least one phone number');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      // Parse phone numbers
      const numbers = phoneNumbers
        .split(/[,\n]/)
        .map(num => num.trim())
        .filter(num => num.length > 0);

      const response = await sendCourseWhatsApp(course.id, {
        phoneNumbers: numbers,
      });

      if (response.success) {
        setResult(response.data);
        setPhoneNumbers('');
      } else {
        setError(response.message || 'Failed to send WhatsApp messages');
      }
    } catch (err) {
      setError(err.message || 'Failed to send WhatsApp messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSendToAllStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await sendCourseToAllStudents(course.id);

      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.message || 'Failed to send to all students');
      }
    } catch (err) {
      setError(err.message || 'Failed to send to all students');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPhoneNumbers('');
    setResult(null);
    setError(null);
    onClose();
  };

  const formatMessagePreview = () => {
    if (!course) return '';
    
    return `🎯 *${course.title}*

📅 *Timing:* ${course.timing}

${course.prerequisite ? `📋 *Prerequisites:* ${course.prerequisite}

` : ''}📝 *Description:*
${course.description}

---
✨ *Ahoum - Your Wellness Journey*

For more information or to register, please reply to this message.

Thank you! 🙏`;
  };

  if (!course) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="logos:whatsapp-icon" />
          <Typography variant="h6">Send Course via WhatsApp</Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Course: {course.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {course.timing}
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Message Preview:
            </Typography>
            <Box
              sx={{
                p: 2,
                bgcolor: 'grey.100',
                borderRadius: 1,
                maxHeight: 200,
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              }}
            >
              {formatMessagePreview()}
            </Box>
          </Box>

          <Divider />

          {error && (
            <Alert severity="error">{error}</Alert>
          )}

          {result && (
            <Alert severity="success">
              <Typography variant="subtitle2" gutterBottom>
                WhatsApp messages sent successfully!
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  • Total recipients: {result.total_recipients || 0}
                </Typography>
                <Typography variant="body2" color="success.main">
                  • Messages sent: {result.messages_sent || 0}
                </Typography>
                {result.messages_failed > 0 && (
                  <Typography variant="body2" color="error.main">
                    • Messages failed: {result.messages_failed}
                  </Typography>
                )}
              </Stack>
            </Alert>
          )}

          <Stack spacing={2}>
            <Typography variant="subtitle2">Send to Specific Numbers:</Typography>
            <TextField
              label="Phone Numbers"
              placeholder="Enter phone numbers separated by commas or new lines"
              multiline
              rows={3}
              value={phoneNumbers}
              onChange={(e) => setPhoneNumbers(e.target.value)}
              helperText="Example: +919876543210, +919123456789"
              fullWidth
            />
            <LoadingButton
              variant="contained"
              onClick={handleSendToNumbers}
              loading={loading}
              startIcon={<Iconify icon="eva:message-square-fill" />}
              disabled={!phoneNumbers.trim()}
            >
              Send to Numbers
            </LoadingButton>
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <Typography variant="subtitle2">Send to All Active Students:</Typography>
            <LoadingButton
              variant="outlined"
              onClick={handleSendToAllStudents}
              loading={loading}
              startIcon={<Iconify icon="eva:people-fill" />}
            >
              Send to All Students
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

WhatsAppSendDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  course: PropTypes.object,
  onClose: PropTypes.func.isRequired,
}; 