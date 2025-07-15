import { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

export function useDateRangePicker(initialValue = null, initialEndDate = null) {
  const [startDate, setStartDate] = useState(initialValue);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [open, setOpen] = useState(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onChangeStartDate = useCallback((newDate) => {
    setStartDate(newDate);
  }, []);

  const onChangeEndDate = useCallback((newDate) => {
    setEndDate(newDate);
  }, []);

  const onReset = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);

  return {
    open,
    onOpen,
    onClose,
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    onReset,
    selected: Boolean(startDate && endDate),
    error: Boolean(startDate && endDate && startDate > endDate),
  };
}
