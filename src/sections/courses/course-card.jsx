import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Stack,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CourseCard({ course, onEdit, onDelete, onSendWhatsApp }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={
          <Typography variant="h6" noWrap>
            {course.title}
          </Typography>
        }
        action={
          <Chip
            label={course.is_active ? 'Active' : 'Inactive'}
            color={course.is_active ? 'success' : 'default'}
            size="small"
          />
        }
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              📅 Timing
            </Typography>
            <Typography variant="body2">{course.timing}</Typography>
          </Box>

          {course.prerequisite && (
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                📋 Prerequisites
              </Typography>
              <Typography variant="body2">{course.prerequisite}</Typography>
            </Box>
          )}

          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              📝 Description
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {course.description}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Created: {formatDate(course.created_at)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
          <Button
            variant="contained"
            startIcon={<Iconify icon="logos:whatsapp-icon" />}
            onClick={onSendWhatsApp}
            size="small"
            sx={{ flexGrow: 1 }}
          >
            Send WhatsApp
          </Button>
          <IconButton onClick={onEdit} size="small" color="primary">
            <Iconify icon="eva:edit-fill" />
          </IconButton>
          <IconButton onClick={onDelete} size="small" color="error">
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSendWhatsApp: PropTypes.func.isRequired,
}; 