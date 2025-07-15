import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Popover from '@mui/material/Popover';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'On demand', 'Negotiable'];
const EXPERIENCE_OPTIONS = ['All', 'No experience', '1 year exp', '2 year exp', '> 3 year exp'];
const ROLES = ['Developer', 'Designer', 'Manager', 'Admin', 'Support'];
const LOCATIONS = ['Remote', 'Office', 'Hybrid'];
const BENEFITS = ['Free parking', 'Bonus commission', 'Travel', 'Device support'];

// ----------------------------------------------------------------------

export function UserFilters({ anchorEl, open, onClose, filters }) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleFilterEmploymentTypes = useCallback(
    (newValue) => {
      const checked = currentFilters.employmentTypes.includes(newValue)
        ? currentFilters.employmentTypes.filter((value) => value !== newValue)
        : [...currentFilters.employmentTypes, newValue];

      updateFilters({ employmentTypes: checked });
    },
    [updateFilters, currentFilters.employmentTypes]
  );

  const handleFilterExperience = useCallback(
    (newValue) => {
      updateFilters({ experience: newValue });
    },
    [updateFilters]
  );

  const handleFilterRoles = useCallback(
    (newValue) => {
      updateFilters({ roles: newValue });
    },
    [updateFilters]
  );

  const handleFilterLocations = useCallback(
    (newValue) => {
      updateFilters({ locations: newValue });
    },
    [updateFilters]
  );

  const handleFilterBenefits = useCallback(
    (newValue) => {
      const checked = currentFilters.benefits.includes(newValue)
        ? currentFilters.benefits.filter((value) => value !== newValue)
        : [...currentFilters.benefits, newValue];

      updateFilters({ benefits: checked });
    },
    [updateFilters, currentFilters.benefits]
  );

  const renderHead = () => (
    <>
      <Box
        sx={{
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">Filters</Typography>

        <Tooltip title="Reset">
          <IconButton onClick={() => resetFilters()}>
            <Badge color="error" variant="dot" invisible={!Object.values(currentFilters).some(x => x.length)}>
              <Iconify icon="solar:restart-bold" />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />
    </>
  );

  const renderEmploymentTypes = () => (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Employment types</Typography>
      {EMPLOYMENT_TYPES.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={currentFilters.employmentTypes.includes(option)}
              onClick={() => handleFilterEmploymentTypes(option)}
            />
          }
          label={option}
        />
      ))}
    </Stack>
  );

  const renderExperience = () => (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Experience</Typography>
      {EXPERIENCE_OPTIONS.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Radio
              checked={option === currentFilters.experience}
              onClick={() => handleFilterExperience(option)}
            />
          }
          label={option}
        />
      ))}
    </Stack>
  );

  const renderRoles = () => (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Roles</Typography>
      <Autocomplete
        multiple
        disableCloseOnSelect
        options={ROLES}
        getOptionLabel={(option) => option}
        value={currentFilters.roles}
        onChange={(event, newValue) => handleFilterRoles(newValue)}
        renderInput={(params) => <TextField placeholder="Select roles" {...params} />}
        slotProps={{
          chip: { size: 'small', variant: 'soft' },
        }}
      />
    </Stack>
  );

  const renderLocations = () => (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Locations</Typography>
      <Autocomplete
        multiple
        disableCloseOnSelect
        options={LOCATIONS}
        getOptionLabel={(option) => option}
        value={currentFilters.locations}
        onChange={(event, newValue) => handleFilterLocations(newValue)}
        renderInput={(params) => <TextField placeholder="Select locations" {...params} />}
        slotProps={{
          chip: { size: 'small', variant: 'soft' },
        }}
      />
    </Stack>
  );

  const renderBenefits = () => (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Benefits</Typography>
      {BENEFITS.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={currentFilters.benefits.includes(option)}
              onClick={() => handleFilterBenefits(option)}
            />
          }
          label={option}
        />
      ))}
    </Stack>
  );

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: { width: 340, p: 0 },
      }}
    >
      {renderHead()}

      <Scrollbar sx={{ height: 460 }}>
        <Stack spacing={2.5} sx={{ p: 3 }}>
          {renderEmploymentTypes()}

          {renderExperience()}

          {renderRoles()}

          {renderLocations()}

          {renderBenefits()}
        </Stack>
      </Scrollbar>

      <Box sx={{ p: 3 }}>
        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          onClick={onClose}
          startIcon={<Iconify icon="carbon:filter" />}
        >
          Apply Filter
        </Button>
      </Box>
    </Popover>
  );
} 