import { forwardRef } from 'react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

export const Nav = forwardRef(({ sx, ...other }, ref) => (
  <Box
    component="nav"
    ref={ref}
    sx={[
      () => ({
        /* Put styles */
      }),
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    {...other}
  />
));

export const NavUl = forwardRef(({ sx, ...other }, ref) => (
  <Box
    component="ul"
    ref={ref}
    sx={[
      {
        m: 0,
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        listStyle: 'none',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    {...other}
  />
));

export const NavLi = forwardRef(({ sx, ...other }, ref) => (
  <Box
    component="li"
    ref={ref}
    sx={[
      () => ({
        /* Put styles */
      }),
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    {...other}
  />
)); 