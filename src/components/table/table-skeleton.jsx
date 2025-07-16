import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export function TableSkeleton({ rows = 5, columns = 3, sx, ...other }) {
  return (
    <>
      {Array.from({ length: rows }, (unused, rowIndex) => (
        <TableRow key={rowIndex} sx={sx} {...other}>
          {Array.from({ length: columns }, (unused2, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
