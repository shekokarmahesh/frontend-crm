import PropTypes from 'prop-types';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Iconify } from 'src/components/iconify';

export default function ViewToggle({ view, onChange }) {
  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={onChange}
      aria-label="view mode"
      sx={{ mb: 2 }}
    >
      <ToggleButton value="list" aria-label="list view">
        <Iconify icon="solar:list-bold" />
      </ToggleButton>
      <ToggleButton value="card" aria-label="card view">
        <Iconify icon="solar:gallery-wide-bold" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

ViewToggle.propTypes = {
  view: PropTypes.oneOf(['list', 'card']).isRequired,
  onChange: PropTypes.func.isRequired,
}; 