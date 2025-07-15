import { useState, useCallback } from 'react';

export function usePopover() {
  const [open, setOpen] = useState(null);

  const onOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setOpen(null);
  }, []);

  return {
    open: Boolean(open),
    anchorEl: open,
    onOpen,
    onClose,
  };
} 