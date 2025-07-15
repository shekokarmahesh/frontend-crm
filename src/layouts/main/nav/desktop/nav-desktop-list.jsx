import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

import { NavLi } from '../components';

// ----------------------------------------------------------------------

export function NavList({ data }) {
  return (
    <NavLi>
      <Link
        component={RouterLink}
        href={data.path}
        color="inherit"
        variant="subtitle2"
        sx={{
          py: 1,
          px: 1.5,
          borderRadius: 1,
          textDecoration: 'none',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        {data.title}
      </Link>
    </NavLi>
  );
} 