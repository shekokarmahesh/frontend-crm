import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export function ViewWebsiteButton({ variant = 'contained', size = 'medium', subdomain = null, ...other }) {
  const handleViewWebsite = () => {
    const websitePath = subdomain ? `/website/${subdomain}` : paths.website;
    // Open in new tab for website preview
    window.open(websitePath, '_blank');
  };

  if (variant === 'icon') {
    return (
      <Tooltip title="View Website">
        <IconButton onClick={handleViewWebsite} size={size} {...other}>
          <Iconify icon="solar:eye-bold" />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleViewWebsite}
      startIcon={<Iconify icon="solar:eye-bold" />}
      {...other}
    >
      View Website
    </Button>
  );
}

ViewWebsiteButton.propTypes = {
  variant: PropTypes.oneOf(['contained', 'outlined', 'text', 'icon']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  subdomain: PropTypes.string,
};

// ----------------------------------------------------------------------

export function PreviewWebsiteCard({ title = "Your Website is Ready!", description = "Click below to preview your professional website" }) {
  return (
    <div style={{
      padding: '24px',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      backgroundColor: '#f8f9fa',
      textAlign: 'center',
      margin: '16px 0'
    }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>{title}</h3>
      <p style={{ margin: '0 0 16px 0', color: '#666' }}>{description}</p>
      <ViewWebsiteButton />
    </div>
  );
}
