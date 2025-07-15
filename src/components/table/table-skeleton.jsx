import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

export function TableSkeleton({ rows = 5, columns = 3, sx, ...other }) {
  return (
    <>
      {Array.from({ length: rows }, (_, index) => (
        <TableRow key={index} sx={sx} {...other}>
          {Array.from({ length: columns }, (_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
