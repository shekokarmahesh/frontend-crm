import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

export const CustomDateRangePicker = forwardRef(({
  open,
  onClose,
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
  error,
  ...other
}, ref) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth {...other}>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Iconify icon="solar:calendar-date-bold" />
          Select date range
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <DatePicker
            label="Start date"
            value={startDate}
            onChange={onChangeStartDate}
            slotProps={{
              textField: {
                fullWidth: true,
                error: error,
              },
            }}
          />
          
          <DatePicker
            label="End date"
            value={endDate}
            onChange={onChangeEndDate}
            slotProps={{
              textField: {
                fullWidth: true,
                error: error,
                helperText: error ? 'End date must be after start date' : '',
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onClose} variant="contained" disabled={error}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
});
