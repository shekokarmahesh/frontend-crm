import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Box,
  Card,
  Container,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Button,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { getCourse, createCourse, updateCourse } from 'src/services/api';

import CourseForm from './course-form';

// ----------------------------------------------------------------------

export default function CourseCreateView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchCourse();
    }
  }, [id, isEdit]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCourse(id);
      if (response.success) {
        setCourse(response.data);
      } else {
        setError(response.message || 'Failed to fetch course');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch course');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setError(null);

      let response;
      if (isEdit) {
        response = await updateCourse(id, formData);
      } else {
        response = await createCourse(formData);
      }

      if (response.success) {
        navigate('/dashboard/courses');
      } else {
        setError(response.message || `Failed to ${isEdit ? 'update' : 'create'} course`);
      }
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} course`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/courses');
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{isEdit ? 'Edit Course' : 'Create Course'}</Typography>
        <Button
          variant="outlined"
          startIcon={<Iconify icon="eva:arrow-back-fill" />}
          onClick={handleCancel}
        >
          Back to Courses
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ p: 3 }}>
        <CourseForm
          course={course}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={submitting}
          isEdit={isEdit}
        />
      </Card>
    </Container>
  );
} 