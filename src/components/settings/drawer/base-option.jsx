import { varAlpha } from 'minimal-shared/utils';

import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import { Iconify } from '../../iconify';

// ----------------------------------------------------------------------

export function BaseOption({
  sx,
  icon,
  label,
  action,
  tooltip,
  selected,
  onChangeOption,
  ...other
}) {
  return (
    <ItemRoot disableRipple selected={selected} onClick={onChangeOption} sx={sx} {...other}>
      <TopContainer>
        {icon}
        {action ?? (
          <Switch name={label} size="small" color="default" checked={selected} sx={{ mr: -0.75 }} />
        )}
      </TopContainer>

      <BottomContainer>
        <ItemLabel>{label}</ItemLabel>

        {tooltip && (
          <Tooltip
            arrow
            title={tooltip}
            slotProps={{ tooltip: { sx: { maxWidth: 240, mr: 0.5 } } }}
          >
            <Iconify
              width={16}
              icon="eva:info-outline"
              sx={{ cursor: 'pointer', color: 'text.disabled' }}
            />
          </Tooltip>
        )}
      </BottomContainer>
    </ItemRoot>
  );
}

// ----------------------------------------------------------------------

const ItemRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => !['selected', 'sx'].includes(prop),
})(({ selected, theme }) => ({
  cursor: 'pointer',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing(2, 2, 2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
  '&:hover': {
    backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
  },
  ...(selected && {
    backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
  }),
}));

const TopContainer = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  justifyContent: 'space-between',
}));

const BottomContainer = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ItemLabel = styled('span')(({ theme }) => ({
  lineHeight: '18px',
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightSemiBold,
}));
