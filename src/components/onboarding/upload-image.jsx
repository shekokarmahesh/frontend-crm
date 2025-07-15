import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

export function UploadImage({ onUpload, helperText, sx, ...other }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      onUpload({ file, previewUrl });
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <Box {...other}>
      <Box
        {...getRootProps()}
        sx={{
          p: 5,
          outline: 'none',
          borderRadius: 1,
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
          transition: (theme) => theme.transitions.create(['opacity', 'padding']),
          '&:hover': {
            opacity: 0.72,
          },
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...sx,
        }}
      >
        <input {...getInputProps()} />

        <Stack spacing={2} alignItems="center" justifyContent="center">
          <Iconify icon="solar:upload-minimalistic-bold" width={40} />
          <Stack spacing={0.5} alignItems="center">
            <Button
              variant="text"
              size="small"
              startIcon={<Iconify icon="solar:gallery-add-bold" />}
            >
              Choose Image
            </Button>
            {helperText && (
              <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
                {helperText}
              </Box>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
} 