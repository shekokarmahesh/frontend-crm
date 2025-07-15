import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

export function TableSelectedAction({
  dense,
  action,
  rowCount,
  numSelected,
  onSelectAllRows,
  sx,
  ...other
}) {
  if (!numSelected) {
    return null;
  }

  return (
    <Toolbar
      sx={[
        (theme) => ({
          pl: 1,
          pr: 2,
          top: 0,
          left: 0,
          width: 1,
          zIndex: 99,
          height: 58,
          position: 'absolute',
          color: 'primary.main',
          bgcolor: 'primary.lighter',
          ...(dense && { height: 38 }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Typography component="div" variant="subtitle1" sx={{ flex: '1 1 100%' }}>
        {numSelected} selected
      </Typography>

      {action && action}

      <Tooltip title="Clear">
        <IconButton onClick={() => onSelectAllRows(false)}>
          <Iconify icon="solar:close-circle-bold" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
