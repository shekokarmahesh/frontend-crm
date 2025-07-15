import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  Button,
  Container,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip,
  TextField,
  InputAdornment,
  TablePagination,
  useTheme,
  alpha,
} from '@mui/material';
import { useNavigate } from 'react-router';

import { Iconify } from 'src/components/iconify';
import { getCourses, deleteCourse } from 'src/services/api';

import WhatsAppSendDialog from './whatsapp-send-dialog';
import CourseCallDialog from './course-call-dialog';

// ----------------------------------------------------------------------

export default function CoursesView() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [whatsappDialog, setWhatsappDialog] = useState({ open: false, course: null });
  const [callDialog, setCallDialog] = useState({ open: false, course: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCourses();
      if (response.success) {
        setCourses(response.courses || []);
        setFilteredCourses(response.courses || []);
      } else {
        setError(response.message || 'Failed to fetch courses');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    // Filter courses based on search query
    if (searchQuery.trim() === '') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.timing.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.prerequisite?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
    setPage(0); // Reset to first page when search changes
  }, [courses, searchQuery]);

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      const response = await deleteCourse(courseId);
      if (response.success) {
        setCourses((prev) => prev.filter((course) => course.id !== courseId));
      } else {
        setError(response.message || 'Failed to delete course');
      }
    } catch (err) {
      setError(err.message || 'Failed to delete course');
    }
  };

  const handleEditCourse = (courseId) => {
    navigate(`/dashboard/courses/edit/${courseId}`);
  };

  const handleSendWhatsApp = (course) => {
    setWhatsappDialog({ open: true, course });
  };

  const handleCloseWhatsApp = () => {
    setWhatsappDialog({ open: false, course: null });
  };

  const handleCallStudent = (course) => {
    setCallDialog({ open: true, course });
  };

  const handleCloseCallDialog = () => {
    setCallDialog({ open: false, course: null });
  };

  const handleCallInitiated = (callResult) => {
    console.log('Call initiated:', callResult);
    // You can add success notification here if needed
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  // Calculate pagination
  const paginatedCourses = filteredCourses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Courses</Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate('/dashboard/courses/create')}
        >
          New Course
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {courses.length === 0 ? (
        <Card sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No courses found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create your first course to get started
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/courses/create')}
          >
            Create Course
          </Button>
        </Card>
      ) : (
        <Card>
          <Box sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="h6">
                {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''}
              </Typography>
              <TextField
                size="small"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 300 }}
              />
            </Stack>
          </Box>

          <TableContainer>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Course Title</TableCell>
                  <TableCell>Timing</TableCell>
                  <TableCell>Prerequisite</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCourses.map((course) => (
                  <TableRow key={course.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" noWrap>
                        {course.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={course.timing}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {course.prerequisite ? (
                        <Typography variant="body2" color="text.secondary">
                          {course.prerequisite}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.disabled">
                          No prerequisite
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title={course.description}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            maxWidth: 200,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {course.description}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="AI Call Student">
                          <IconButton
                            size="small"
                            color="info"
                            onClick={() => handleCallStudent(course)}
                            sx={{
                              color: '#0066CC',
                              '&:hover': {
                                backgroundColor: alpha('#0066CC', 0.1),
                              },
                            }}
                          >
                            <Iconify icon="eva:phone-call-fill" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Course">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditCourse(course.id)}
                            sx={{
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              },
                            }}
                          >
                            <Iconify icon="eva:edit-fill" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Send WhatsApp">
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleSendWhatsApp(course)}
                            sx={{
                              color: '#25D366',
                              '&:hover': {
                                backgroundColor: alpha('#25D366', 0.1),
                              },
                            }}
                          >
                            <Iconify icon="logos:whatsapp-icon" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Course">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteCourse(course.id)}
                            sx={{
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.error.main, 0.1),
                              },
                            }}
                          >
                            <Iconify icon="eva:trash-2-fill" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCourses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      )}

      <WhatsAppSendDialog
        open={whatsappDialog.open}
        course={whatsappDialog.course}
        onClose={handleCloseWhatsApp}
      />

      <CourseCallDialog
        open={callDialog.open}
        course={callDialog.course}
        onClose={handleCloseCallDialog}
        onCallInitiated={handleCallInitiated}
      />
    </Container>
  );
} 