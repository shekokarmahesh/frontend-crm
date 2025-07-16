import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const OFFERINGS_DATA = [
  { title: 'Pranayama', price: '₹1,500', description: 'Breath control techniques for wellness' },
  { title: 'Mindful Yoga', price: '₹2,000', description: 'Gentle yoga for mind-body connection' },
  { title: 'Meditation', price: '₹1,200', description: 'Guided meditation sessions' },
  { title: 'Therapy', price: '₹2,500', description: 'Holistic healing therapy' },
];

const generateUrl = (firstName, lastName) => {
  const firstNameStr = firstName?.toLowerCase() || 'yourname';
  const lastNameStr = lastName?.toLowerCase() || '';
  const fullName = lastNameStr ? `${firstNameStr}_${lastNameStr}` : firstNameStr;
  return `${fullName}.ahoum.com`;
};

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=150&fit=crop',
];



export function ProfilePreview({ formData }) {
  const [activeTab, setActiveTab] = useState('experience');
  const {
    firstName,
    lastName,
    location,
    profilePicture,
    bannerImage,
    teachingStyles = [],
    specializations = [],
    languages = [],
    shortBio = '',
    gallery = [],
    experiences = [],
    certifications = [], // Add certifications to destructuring
  } = formData;

  return (
    <Box sx={{ 
      height: '100%', 
      bgcolor: 'background.paper', 
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}>
      {/* Browser Header */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          px: 2,
          py: 1,
          bgcolor: 'grey.100',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" spacing={0.5}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main' }} />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'warning.main' }} />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
        </Stack>
        <Box
          sx={{
            px: 2,
            py: 0.5,
            flexGrow: 1,
            borderRadius: 1,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            typography: 'caption',
            color: 'text.secondary',
          }}
        >
          🔒 {generateUrl(firstName, lastName)}
        </Box>
      </Stack>

      {/* Hero Section */}
      <Box
        component="img"
        src={bannerImage || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=300&fit=crop'}
        alt="Banner"
        sx={{
          width: '100%',
          height: 200,
          objectFit: 'cover',
        }}
      />

      {/* Offerings Section */}
      <Box sx={{ py: 3, bgcolor: 'background.paper' }}>
        <Box sx={{ px: 3 }}>
          <Typography variant="h6" align="center" sx={{ mb: 3, color: 'common.black', fontSize: '0.875rem', fontWeight: 'bold' }}>
            Offerings & Courses
          </Typography>
          <Grid 
            container 
            spacing={2} 
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            {OFFERINGS_DATA.map((offering, idx) => (
              <Paper
                key={idx}
                sx={{
                  p: 2,
                  height: '100%',
                  bgcolor: '#F8F9FA',
                  boxShadow: 'none',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'common.black', fontWeight: 'bold' }}>
                  {offering.title}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: 'common.black' }}>
                  {offering.description}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: 'common.black', fontWeight: 'bold' }}>
                  {offering.price}
                </Typography>
              </Paper>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Profile Section */}
      <Box sx={{ p: 3 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          {/* Left: Image and Tags */}
          <Stack alignItems="center" spacing={1} sx={{ minWidth: 120 }}>
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: 0,
                overflow: 'hidden',
                flexShrink: 0,
                bgcolor: '#EEE7DF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={profilePicture}
                alt={firstName}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>
            {/* Tags below image */}
            <Stack direction="row" spacing={1} mt={1}>
              <Stack direction="row" alignItems="center" spacing={0.525} sx={{
                bgcolor: 'primary.lighter',
                px: 0.7875,
                py: 0.2625,
                borderRadius: 1.05,
                border: '1px solid',
                borderColor: 'primary.main',
              }}>
                <Iconify icon="solar:star-bold" width={7.35} sx={{ color: 'primary.main' }} />
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '0.63rem' }}>
                  4.9
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.525} sx={{
                bgcolor: 'primary.lighter',
                px: 0.7875,
                py: 0.2625,
                borderRadius: 1.05,
                border: '1px solid',
                borderColor: 'primary.main',
              }}>
                <Iconify icon="solar:verified-check-bold" width={7.35} sx={{ color: 'primary.main' }} />
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '0.63rem' }}>
                  Ahoum
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* Right: Details */}
          <Stack spacing={1} sx={{ flex: 1 }}>
            {/* Name and location */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h6" fontWeight="bold">{firstName} {lastName}</Typography>
              <Iconify icon="solar:map-point-bold" width={18} sx={{ color: 'text.primary' }} />
              <Typography variant="body2" color="text.secondary">{location}</Typography>
            </Stack>

            {/* Title */}
            <Typography variant="body1">{teachingStyles?.[0] ? `${teachingStyles[0]} Instructor` : ''}</Typography>

            {/* Language chips */}
            <Stack direction="row" spacing={1} mb={0.5}>
              {languages.map(lang => (
                <Chip key={lang} label={lang} size="small" variant="outlined" />
              ))}
            </Stack>

            {/* Specialization chips */}
            <Stack direction="row" spacing={1} mb={1}>
              {specializations.map(spec => (
                <Chip key={spec} label={spec} size="small" variant="outlined" color="warning" />
              ))}
            </Stack>

            {/* Badges */}
            <Stack direction="row" spacing={2} mt={2}>
              {[1, 2, 3, 4, 5].map(badge => (
                <Box
                  key={badge}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: 'grey.300',
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
        {/* Detailed Bio */}
        {shortBio && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: 'common.black', fontWeight: 'bold', mb: 2 }}>
              About Me
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
              {shortBio}
            </Typography>
          </Box>
        )}

        {/* Experience and Reviews Section */}
        <Box sx={{ mb: 3 }}>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <TabList 
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{ 
                  justifyContent: 'center',
                  '& .MuiTabs-flexContainer': {
                    justifyContent: 'center',
                  }
                }}
              >
                <Tab label="Experience" value="experience" />
                <Tab label="Certifications" value="certifications" />
                <Tab label="Reviews" value="reviews" />
              </TabList>
            </Box>

            {/* Experience Panel */}
            <TabPanel value="experience">
              <Typography variant="h6" sx={{ mb: 3, color: 'common.black', textAlign: 'center' }}>
                Professional Experience
              </Typography>
              {experiences && experiences.length > 0 ? (
                <Stack spacing={2}>
                  {experiences.map((exp, idx) => (
                    <Card 
                      key={idx}
                      sx={{ 
                        p: 2,
                        bgcolor: 'background.paper',
                        '&:hover': {
                          boxShadow: (theme) => theme.shadows[4]
                        }
                      }}
                    >
                      <Stack direction="row" spacing={2}>
                        <Box
                          component="img"
                          src={exp.image || 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=300&h=200&fit=crop'}
                          alt={exp.jobTitle}
                          sx={{
                            width: { xs: '100%', sm: 120 },
                            height: { xs: 200, sm: 120 },
                            objectFit: 'cover',
                            borderRadius: 1,
                            flexShrink: 0
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'common.black', mb: 0.5 }}>
                            {exp.jobTitle || 'Position'}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                            {exp.company || 'Company Name'}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                            {exp.duration || 'Duration'}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {exp.description || 'Experience description'}
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Box 
                  sx={{ 
                    textAlign: 'center', 
                    py: 4,
                    px: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 1,
                    border: '1px dashed',
                    borderColor: 'grey.300'
                  }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                    No experience details added yet
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    Add your professional experience in Step 5
                  </Typography>
                </Box>
              )}
            </TabPanel>

            {/* Certifications Panel */}
            <TabPanel value="certifications">
              <Typography variant="h6" sx={{ mb: 3, color: 'common.black', textAlign: 'center' }}>
                Professional Certifications
              </Typography>
              {certifications && certifications.length > 0 ? (
                <Stack spacing={2}>
                  {certifications.map((cert, idx) => (
                    <Card 
                      key={idx}
                      sx={{ 
                        p: 2,
                        bgcolor: 'background.paper',
                        '&:hover': {
                          boxShadow: (theme) => theme.shadows[4]
                        }
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 1,
                            bgcolor: 'primary.lighter',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Iconify 
                            icon="solar:diploma-verified-bold" 
                            sx={{ 
                              width: 24, 
                              height: 24,
                              color: 'primary.main'
                            }} 
                          />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'common.black', mb: 0.5 }}>
                            {cert.certificationName || 'Certification Name'}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                            {cert.issuingOrganization || 'Issuing Organization'}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                            Issued: {cert.issueDate || 'Issue Date'}
                            {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                          </Typography>
                          {cert.credentialId && (
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                              Credential ID: {cert.credentialId}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Box 
                  sx={{ 
                    textAlign: 'center', 
                    py: 4,
                    px: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 1,
                    border: '1px dashed',
                    borderColor: 'grey.300'
                  }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                    No certifications added yet
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    Add your professional certifications in Step 5
                  </Typography>
                </Box>
              )}
            </TabPanel>

            {/* Reviews Panel */}
            <TabPanel value="reviews">
              <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
                {/* Overall Rating */}
                <Typography variant="h2" sx={{ color: 'common.black', mb: 1, fontWeight: 'bold' }}>
                  4.9
                </Typography>
                <Stack direction="row" spacing={0.5} justifyContent="center" sx={{ mb: 1 }}>
                  {[1, 2, 3, 4].map((star) => (
                    <Iconify 
                      key={star}
                      icon="solar:star-bold" 
                      sx={{ color: 'warning.main', width: 24, height: 24 }} 
                    />
                  ))}
                  <Iconify 
                    icon="solar:star-bold" 
                    sx={{ color: 'grey.300', width: 24, height: 24 }} 
                  />
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                  Based on 143 reviews
                </Typography>

                {/* Rating Breakdown */}
                <Stack spacing={1} sx={{ mb: 4 }}>
                  {[
                    { stars: 5, count: 120 },
                    { stars: 4, count: 15 },
                    { stars: 3, count: 5 },
                    { stars: 2, count: 2 },
                    { stars: 1, count: 1 }
                  ].map((rating) => (
                    <Stack 
                      key={rating.stars}
                      direction="row" 
                      alignItems="center" 
                      spacing={2}
                      sx={{ px: 2 }}
                    >
                      <Typography variant="body2" sx={{ minWidth: 20 }}>
                        {rating.stars}
                      </Typography>
                      <Iconify 
                        icon="solar:star-bold" 
                        sx={{ color: 'warning.main', width: 16, height: 16 }} 
                      />
                      <Box 
                        sx={{ 
                          flex: 1,
                          height: 8,
                          bgcolor: 'grey.200',
                          borderRadius: 1,
                          overflow: 'hidden'
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: `${(rating.count / 143) * 100}%`,
                            height: '100%',
                            bgcolor: 'warning.main',
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ minWidth: 30 }}>
                        {rating.count}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                {/* Recent Reviews */}
                <Typography variant="h6" sx={{ color: 'common.black', mb: 3, textAlign: 'left' }}>
                  Recent Reviews
                </Typography>
                <Stack spacing={3}>
                  {[
                    {
                      name: 'Sarah Johnson',
                      rating: 5,
                      comment: 'Amazing yoga sessions! Sarah\'s teaching style is so calming and effective. I\'ve seen great improvements in my flexibility and mental peace.',
                      time: '2 days ago',
                      avatar: '/path/to/sarah.jpg'
                    },
                    {
                      name: 'Michael Chen',
                      rating: 5,
                      comment: 'The meditation classes have been life-changing. Dr. Priya creates such a peaceful environment and her guidance is exceptional.',
                      time: '1 week ago',
                      avatar: '/path/to/michael.jpg'
                    },
                    {
                      name: 'Emily Rodriguez',
                      rating: 4,
                      comment: 'Great experience overall. The pranayama sessions helped me manage stress much better. Highly recommend for beginners.',
                      time: '2 weeks ago',
                      avatar: '/path/to/emily.jpg'
                    }
                  ].map((review, idx) => (
                    <Card key={idx} sx={{ p: 2 }}>
                      <Stack direction="row" spacing={2}>
                        <Avatar 
                          src={review.avatar}
                          alt={review.name}
                          sx={{ width: 48, height: 48 }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Stack 
                            direction="row" 
                            justifyContent="space-between" 
                            alignItems="center"
                            sx={{ mb: 1 }}
                          >
                            <Typography variant="subtitle2" sx={{ color: 'common.black' }}>
                              {review.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {review.time}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} sx={{ mb: 1 }}>
                            {Array(5).fill(0).map((_, starIdx) => (
                              <Iconify 
                                key={starIdx}
                                icon="solar:star-bold" 
                                sx={{ 
                                  width: 16, 
                                  height: 16,
                                  color: starIdx < review.rating ? 'warning.main' : 'grey.300'
                                }} 
                              />
                            ))}
                          </Stack>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {review.comment}
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>

        {/* Gallery Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: 'common.black' }}>
            Gallery
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1.5,
            }}
          >
            {(gallery.length > 0 ? gallery : GALLERY_IMAGES).slice(0, 6).map((img, idx) => (
              <Box
                key={idx}
                sx={{
                  position: 'relative',
                  paddingTop: '75%', // 4:3 aspect ratio
                  borderRadius: 1,
                  overflow: 'hidden',
                  boxShadow: (theme) => theme.shadows[1],
                }}
              >
                <Box
                  component="img"
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Retreats and Events Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: 'common.black' }}>
            Retreats & Events
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            {[
              {
                title: 'Ayurveda Retreat',
                location: 'Rishikesh',
                date: 'Dec 15-17',
                price: '₹15,000',
                img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
              },
              {
                title: 'Mindfulness Workshop',
                location: 'Online',
                date: 'Jan 20',
                price: '₹3,000',
                img: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=300&fit=crop',
              },
              {
                title: 'Sound Healing Circle',
                location: 'Mumbai Studio',
                date: 'Feb 5-6',
                price: '₹8,000',
                img: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
              },
              {
                title: 'Nature Meditation',
                location: 'Goa Beach',
                date: 'Mar 12-14',
                price: '₹12,000',
                img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
              },
            ].map((retreat, idx) => (
              <Card
                key={idx}
                sx={{
                  overflow: 'hidden',
                  '&:hover': {
                    boxShadow: (theme) => theme.shadows[4],
                  },
                  transition: 'box-shadow 0.3s',
                }}
              >
                <Box
                  component="img"
                  src={retreat.img}
                  alt={retreat.title}
                  sx={{
                    width: '100%',
                    height: 160,
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'common.black', mb: 0.5 }}>
                    {retreat.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    {retreat.location} • {retreat.date}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: 'common.black', fontWeight: 'bold' }}>
                    {retreat.price}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Contact Section */}
        <Box sx={{ mb: 3, bgcolor: '#F8F9FA', py: 3, px: 3, borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: 'common.black', textAlign: 'center', fontWeight: 'bold' }}>
            Contact & Consultation
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="solar:phone-bold" width={16} sx={{ color: 'common.black' }} />
                  <Typography variant="caption" sx={{ color: 'common.black' }}>
                    {formData.phone || '+91 98765 43210'}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="solar:mailbox-bold" width={16} sx={{ color: 'common.black' }} />
                  <Typography variant="caption" sx={{ color: 'common.black' }}>
                    contact@{generateUrl(firstName, lastName)}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'common.black', fontSize: '0.75rem', fontWeight: 'bold' }}>
                Follow Me
              </Typography>
              <Stack direction="row" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Iconify icon="mdi:instagram" width={16} sx={{ color: 'common.black' }} />
                  <Typography variant="caption" sx={{ color: 'common.black' }}>
                    Instagram
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Iconify icon="mdi:facebook" width={16} sx={{ color: 'common.black' }} />
                  <Typography variant="caption" sx={{ color: 'common.black' }}>
                    Facebook
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

ProfilePreview.propTypes = {
  formData: PropTypes.object,
}; 