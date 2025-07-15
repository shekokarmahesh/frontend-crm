import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }) {
  return (
    <Button
      component={RouterLink}
      href="/auth/sign-in"
      color="inherit"
      sx={sx}
      {...other}
    >
      Sign in
    </Button>
  );
}
