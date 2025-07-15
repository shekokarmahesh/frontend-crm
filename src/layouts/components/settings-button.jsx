import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export function SettingsButton({ sx, ...other }) {
  const settings = useSettingsContext();

  return (
    <IconButton
      onClick={settings.onToggle}
      sx={[
        {
          width: 40,
          height: 40,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Iconify icon="solar:settings-outline" width={24} />
    </IconButton>
  );
}
