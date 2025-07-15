import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { chartClasses } from '../classes';

// ----------------------------------------------------------------------

export function ChartLoading({ sx, ...other }) {
  return (
    <Box
      className={chartClasses.loading}
      sx={[
        {
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <CircularProgress />
    </Box>
  );
}
