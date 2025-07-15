import Box from '@mui/material/Box';

import { chartClasses } from '../classes';

// ----------------------------------------------------------------------

export function ChartLegends({ legends, sx, ...other }) {
  return (
    <Box
      className={chartClasses.legends.root}
      sx={[
        {
          gap: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {legends?.map((legend, index) => (
        <Box
          key={index}
          className={chartClasses.legends.item.wrap}
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 0.5,
            minWidth: 72,
          }}
        >
          {/* Row with dot and label */}
          <Box
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}
            className={chartClasses.legends.item.root}
          >
            <Box
              className={chartClasses.legends.item.dot}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: legend.color,
                flexShrink: 0,
              }}
            />
            <Box
              className={chartClasses.legends.item.label}
              sx={{ color: legend.color, typography: 'subtitle2' }}
            >
              {legend.label}
            </Box>
          </Box>

          {/* Value displayed below if provided */}
          {legend.value !== undefined && (
            <Box
              className={chartClasses.legends.item.value}
              sx={{ typography: 'h6', color: 'text.primary' }}
            >
              {legend.value}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
