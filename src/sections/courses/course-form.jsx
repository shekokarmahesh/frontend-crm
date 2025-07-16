import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CourseForm({ course, onSubmit, onCancel, loading, isEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    timing: '',
    prerequisite: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        timing: course.timing || '',
        prerequisite: course.prerequisite || '',
        description: course.description || '',
      });
    }
  }, [course]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.timing.trim()) {
      newErrors.timing = 'Timing is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h6" gutterBottom>
          Course Information
        </Typography>

        <TextField
          label="Course Title"
          value={formData.title}
          onChange={handleInputChange('title')}
          error={!!errors.title}
          helperText={errors.title}
          fullWidth
          required
          placeholder="e.g., Yoga for Beginners"
        />

        <TextField
          label="Timing"
          value={formData.timing}
          onChange={handleInputChange('timing')}
          error={!!errors.timing}
          helperText={errors.timing}
          fullWidth
          required
          placeholder="e.g., Monday & Wednesday 6:00 PM - 7:00 PM"
        />

        <TextField
          label="Prerequisites"
          value={formData.prerequisite}
          onChange={handleInputChange('prerequisite')}
          error={!!errors.prerequisite}
          helperText={errors.prerequisite}
          fullWidth
          placeholder="e.g., No prior experience needed"
        />

        <TextField
          label="Description"
          value={formData.description}
          onChange={handleInputChange('description')}
          error={!!errors.description}
          helperText={errors.description}
          fullWidth
          required
          multiline
          rows={4}
          placeholder="Describe your course in detail..."
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            startIcon={<Iconify icon={isEdit ? "eva:save-fill" : "eva:plus-fill"} />}
          >
            {isEdit ? 'Update Course' : 'Create Course'}
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  isEdit: PropTypes.bool,
}; 