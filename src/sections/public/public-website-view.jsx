import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';
import { getPublicWebsiteData } from '../../services/api';

// ----------------------------------------------------------------------

// Mock data for offerings (can be replaced with API data later)
const OFFERINGS_DATA = [
  { title: 'Pranayama', price: '₹1,500', description: 'Breath control techniques for wellness' },
  { title: 'Mindful Yoga', price: '₹2,000', description: 'Gentle yoga for mind-body connection' },
  { title: 'Meditation', price: '₹1,200', description: 'Guided meditation sessions' },
  { title: 'Therapy', price: '₹2,500', description: 'Holistic healing therapy' },
];

// Mock gallery images
const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=200&h=150&fit=crop',
];

// Mock experience data
const MOCK_EXPERIENCES = [
  {
    title: 'Senior Yoga Therapist',
    company: 'Wellness Center Delhi',
    duration: '6 years (2018-2024)',
    description: 'Specialized in therapeutic yoga for chronic pain and stress management',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=300&h=200&fit=crop'
  },
  {
    title: 'Freelance Instructor',
    company: 'Various Studios Mumbai',
    duration: '8 years (2016-2024)',
    description: 'Conducted workshops and retreats across Mumbai and Goa',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop'
  },
  {
    title: 'Mindfulness Coach',
    company: 'Corporate Wellness Programs',
    duration: '4 years (2020-2024)',
    description: 'Delivered stress management and mindfulness training to professionals',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
  }
];

// ----------------------------------------------------------------------

// Public Website Component - Only shows website preview for subdomain access
export function PublicWebsiteView() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [practitionerData, setPractitionerData] = useState(null);
  const [subdomain, setSubdomain] = useState(null);
  const [activeTab, setActiveTab] = useState('reviews');
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchPublicWebsiteData = async () => {
      try {
        setLoading(true);
        
        // Detect if we're on a subdomain
        const hostname = window.location.hostname;
        let detectedSubdomain = null;
        
        // Check for localhost subdomain (development)
        if (hostname.includes('.localhost')) {
          detectedSubdomain = hostname.split('.')[0];
        }
        // Check for production subdomain
        else if (hostname.includes('.ahoum.com') && hostname !== 'ahoum.com' && hostname !== 'www.ahoum.com') {
          detectedSubdomain = hostname.replace('.ahoum.com', '');
        }
        
        if (!detectedSubdomain) {
          throw new Error('No valid subdomain detected');
        }
        
        setSubdomain(detectedSubdomain);
        
        // Fetch public website data from backend using API service
        const data = await getPublicWebsiteData(detectedSubdomain);
        
        if (data.success && data.practitioner) {
          setPractitionerData(data.practitioner);
        } else {
          throw new Error('Invalid website data');
        }
        
      } catch (err) {
        console.error('Error fetching public website data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicWebsiteData();
  }, []);

  // Navigation menu items
  const navigationItems = [
    { label: 'Services', id: 'offerings' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Events', id: 'events' },
    { label: 'Contact', id: 'contact' },
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: 'background.default'
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 3,
          bgcolor: 'background.default'
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 500 }}>
          <strong>Website Not Found</strong><br />
          {error === 'No valid subdomain detected' ? 
            'This URL does not appear to be a valid practitioner website.' :
            error
          }
        </Alert>
      </Box>
    );
  }

  // Render the website using the full template
  return (
    <PublicWebsiteDisplay 
      practitionerData={practitionerData}
      subdomain={subdomain}
      navigationItems={navigationItems}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      anchorEl={anchorEl}
      handleMenuClick={handleMenuClick}
      handleMenuClose={handleMenuClose}
      scrollToSection={scrollToSection}
    />
  );
}

// Full public website display component using the same template as website-view.jsx
function PublicWebsiteDisplay({ 
  practitionerData, 
  subdomain, 
  navigationItems, 
  activeTab, 
  setActiveTab, 
  anchorEl, 
  handleMenuClick, 
  handleMenuClose, 
  scrollToSection 
}) {
  const basicInfo = practitionerData?.basic_info || {};
  const bioAbout = practitionerData?.bio_about || {};
  const professionalDetails = practitionerData?.professional_details || {};
  const visualProfile = practitionerData?.visual_profile || {};
  const experienceCertifications = practitionerData?.experience_certifications || {};
  
  // Extract data with fallbacks to dummy data
  const first_name = basicInfo.first_name || 'Dr. Priya';
  const last_name = basicInfo.last_name || 'Sharma';
  const location = basicInfo.location || 'Goa, India';
  const email = basicInfo.email || 'contact@example.com';
  const profile_url = visualProfile.profile_url || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop';
  const banner_urls = visualProfile.banner_urls || ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop'];
  const teaching_styles = professionalDetails.teaching_styles || ['Hatha Yoga', 'Vinyasa'];
  const specializations = professionalDetails.specializations || ['Stress Relief', 'Mindfulness'];
  const languages = professionalDetails.languages || ['English', 'Hindi'];
  const short_bio = bioAbout.short_bio || 'Certified Yoga Therapist & Wellness Expert';
  const detailed_intro = bioAbout.detailed_intro || 'Passionate about helping people achieve wellness through yoga and mindfulness. With over 8 years of experience, I specialize in therapeutic yoga and meditation practices.';
  const work_experiences = experienceCertifications.work_experiences || MOCK_EXPERIENCES;
  const certifications = experienceCertifications.certifications || [];
  const phone_number = practitionerData?.practitioner?.phone_number || '+91 98765 43210';
  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper' }}>
      {/* Hide scrollbar styles */}
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          html::-webkit-scrollbar,
          body::-webkit-scrollbar,
          *::-webkit-scrollbar {
            display: none;
          }
          
          /* Hide scrollbar for IE, Edge and Firefox */
          html,
          body {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
            overflow-x: hidden;
          }
          
          /* Ensure all elements hide scrollbar */
          * {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          *::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {/* Navigation Bar */}
      <AppBar 
        position="absolute" 
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 1000,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => scrollToSection('top')}
          >
            {first_name} {last_name}
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Show live indicator for public sites */}
            <Chip 
              label="Live Site" 
              size="small" 
              color="success" 
              variant="outlined"
              sx={{ fontWeight: 'bold' }}
            />
            
            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  sx={{
                    color: 'text.primary',
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Mobile Navigation Menu */}
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' } }}
              onClick={handleMenuClick}
            >
              <Iconify icon="solar:hamburger-menu-bold" width={24} />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {navigationItems.map((item) => (
                <MenuItem
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    handleMenuClose();
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        id="top"
        sx={{
          position: 'relative',
          width: '100vw',
          height: { xs: '100vh', md: '100vh' },
          overflow: 'hidden',
        }}
      >
        {/* Banner Image */}
        <Box
          component="img"
          src={banner_urls[0]}
          alt="Banner"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Bio Content */}
          <Container maxWidth="md">
            <Box
              sx={{
                textAlign: 'center',
                color: 'white',
                px: { xs: 2, md: 4 },
              }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                }}
              >
                {first_name} {last_name}
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 3,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                }}
              >
                {teaching_styles?.length > 0 ? `${teaching_styles[0]} Instructor` : 'Certified Yoga Therapist & Wellness Expert'}
              </Typography>
              
              {short_bio && (
                <Typography 
                  variant="h6" 
                  sx={{ 
                    maxWidth: 600,
                    mx: 'auto',
                    lineHeight: 1.6,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                    fontWeight: 400,
                  }}
                >
                  {short_bio}
                </Typography>
              )}
            </Box>
          </Container>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* About Me Section - Moved here from Profile Section */}
        <Box id="about" sx={{ mb: 6 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mb: 4 }}>
            <Stack alignItems="center" spacing={2}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={profile_url}
                  sx={{
                    width: 250,
                    height: 250,
                    bgcolor: '#EEE7DF',
                    fontSize: '3rem',
                    borderRadius: 0,
                    boxShadow: 3,
                  }}
                >
                  {first_name?.charAt(0)}
                </Avatar>
              </Box>
            </Stack>

            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
                <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                  {first_name} {last_name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="solar:map-point-bold" width={20} sx={{ color: 'text.primary' }} />
                  <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    {location}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ 
                  bgcolor: 'primary.lighter',
                  px: 2,
                  py: 0.5,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'primary.main'
                }}>
                  <Iconify icon="solar:star-bold" width={16} sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    4.9
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ 
                  bgcolor: 'primary.lighter',
                  px: 2,
                  py: 0.5,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'primary.main'
                }}>
                  <Iconify icon="solar:verified-check-bold" width={16} sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    Ahoum
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="h6" sx={{ color: 'text.primary' }}>
                {teaching_styles?.length > 0 ? `${teaching_styles[0]} Instructor` : 'Certified Yoga Therapist & Wellness Expert'}
              </Typography>
              
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {languages.map(lang => (
                    <Chip
                      key={lang}
                      label={lang}
                      size="medium"
                      variant="outlined"
                      sx={{ 
                        borderColor: 'common.black',
                        color: 'common.black',
                        '&:hover': {
                          bgcolor: 'grey.100',
                        }
                      }}
                    />
                  ))}
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {specializations.map((spec) => (
                    <Chip
                      key={spec}
                      label={spec}
                      size="medium"
                      variant="outlined"
                      sx={{ 
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        '&:hover': {
                          bgcolor: 'primary.lighter',
                        }
                      }}
                    />
                  ))}
                </Stack>
              </Stack>

              <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                {[1, 2, 3, 4, 5].map((badge) => (
                  <Box
                    key={badge}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'grey.300',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 1,
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>

          {/* Detailed Bio */}
          {detailed_intro && (
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ color: 'common.black', fontWeight: 'bold' }}>
                  About Me
                </Typography>
                <Chip 
                  label="Live Data" 
                  size="small" 
                  color="success" 
                  variant="outlined"
                  sx={{ fontWeight: 'bold' }}
                />
              </Stack>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                {detailed_intro}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Offerings Section */}
        <Box id="offerings" sx={{ mb: 6 }}>
          <Typography variant="h4" align="center" sx={{ mb: 4, color: 'common.black', fontWeight: 'bold' }}>
            Offerings & Courses
          </Typography>
          <Grid container spacing={3}>
            {OFFERINGS_DATA.map((offering, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    bgcolor: '#F8F9FA',
                    boxShadow: 2,
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1, color: 'common.black', fontWeight: 'bold' }}>
                    {offering.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    {offering.description}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    {offering.price}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Retreats and Events Section */}
        <Box id="events" sx={{ mb: 6, mt: 12 }}>
          <Typography variant="h4" align="center" sx={{ mb: 3, color: 'common.black', fontWeight: 'bold' }}>
            Retreats & Events
          </Typography>
          <Grid container spacing={3}>
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
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card
                  sx={{
                    overflow: 'hidden',
                    '&:hover': {
                      boxShadow: 6,
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
                      height: 200,
                      objectFit: 'cover',
                    }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'common.black', mb: 1 }}>
                      {retreat.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      {retreat.location} • {retreat.date}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      {retreat.price}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Gallery Section */}
        <Box id="gallery" sx={{ mb: 6 }}>
          <Typography variant="h4" align="center" sx={{ mb: 4, color: 'common.black', fontWeight: 'bold' }}>
            Gallery
          </Typography>
          <Grid container spacing={2}>
            {GALLERY_IMAGES.map((img, idx) => (
              <Grid item xs={4} key={idx}>
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Experience and Certifications Section */}
        <Box id="experience" sx={{ mb: 4 }}>
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
                  <Tab label="Reviews" value="reviews" />
                  <Tab label="Experience" value="experience" />
                  <Tab label="Certifications" value="certifications" />
                </TabList>
              </Box>

              {/* Experience Panel */}
              <TabPanel value="experience">
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
                  <Typography variant="h4" sx={{ color: 'common.black', textAlign: 'center', fontWeight: 'bold' }}>
                    Professional Experience
                  </Typography>
                  {work_experiences && work_experiences.length > 0 && (
                    <Chip 
                      label="Live Data" 
                      size="small" 
                      color="success" 
                      variant="outlined"
                      sx={{ fontWeight: 'bold' }}
                    />
                  )}
                </Stack>
                {work_experiences && work_experiences.length > 0 ? (
                  <Stack spacing={3}>
                    {work_experiences.map((exp, idx) => (
                      <Card 
                        key={idx}
                        sx={{ 
                          p: 3,
                          bgcolor: 'background.paper',
                          boxShadow: 2,
                          borderRadius: 2,
                          '&:hover': {
                            boxShadow: 4
                          }
                        }}
                      >
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                          <Box
                            component="img"
                            src={exp.image || 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=300&h=200&fit=crop'}
                            alt={exp.title || exp.jobTitle}
                            sx={{
                              width: { xs: '100%', md: 200 },
                              height: { xs: 200, md: 150 },
                              objectFit: 'cover',
                              borderRadius: 2,
                              flexShrink: 0
                            }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'common.black', mb: 1 }}>
                              {exp.title || exp.jobTitle || 'Position'}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
                              {exp.company || 'Company Name'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                              {exp.duration || 'Duration'}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
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
                      py: 8,
                      px: 4,
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                      border: '1px dashed',
                      borderColor: 'grey.300'
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                      Professional Experience
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      Experience details will be displayed here
                    </Typography>
                  </Box>
                )}
              </TabPanel>

              {/* Certifications Panel */}
              <TabPanel value="certifications">
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
                  <Typography variant="h4" sx={{ color: 'common.black', textAlign: 'center', fontWeight: 'bold' }}>
                    Professional Certifications
                  </Typography>
                  {certifications && certifications.length > 0 && (
                    <Chip 
                      label="Live Data" 
                      size="small" 
                      color="success" 
                      variant="outlined"
                      sx={{ fontWeight: 'bold' }}
                    />
                  )}
                </Stack>
                {certifications && certifications.length > 0 ? (
                  <Stack spacing={3}>
                    {certifications.map((cert, idx) => (
                      <Card 
                        key={idx}
                        sx={{ 
                          p: 3,
                          bgcolor: 'background.paper',
                          boxShadow: 2,
                          borderRadius: 2,
                          '&:hover': {
                            boxShadow: 4
                          }
                        }}
                      >
                        <Stack direction="row" spacing={3} alignItems="flex-start">
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              bgcolor: 'primary.lighter',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Iconify 
                              icon="solar:diploma-verified-bold" 
                              sx={{ 
                                width: 32, 
                                height: 32,
                                color: 'primary.main'
                              }} 
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'common.black', mb: 1 }}>
                              {cert.certificationName || cert.name || 'Certification Name'}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
                              {cert.issuingOrganization || cert.organization || cert.issuer || 'Issuing Organization'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                              Issued: {cert.issueDate || cert.dateReceived || cert.date || 'Issue Date'}
                              {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                            </Typography>
                            {cert.credentialId && (
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
                      py: 8,
                      px: 4,
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                      border: '1px dashed',
                      borderColor: 'grey.300'
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                      Professional Certifications
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      Certifications will be displayed here
                    </Typography>
                  </Box>
                )}
              </TabPanel>

              {/* Reviews Panel */}
              <TabPanel value="reviews">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, maxWidth: 1100, mx: 'auto', gap: 6 }}>
                  {/* Left Column: Review Summary */}
                  <Box sx={{ flex: '0 0 320px', minWidth: 260, textAlign: 'center', mb: { xs: 4, md: 0 } }}>
                    <Typography variant="h2" sx={{ color: 'common.black', mb: 2, fontWeight: 'bold' }}>
                      4.9
                    </Typography>
                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                      {[1, 2, 3, 4].map((star) => (
                        <Iconify 
                          key={star}
                          icon="solar:star-bold" 
                          sx={{ color: '#FFA726', width: 32, height: 32 }} 
                        />
                      ))}
                      <Iconify 
                        icon="solar:star-bold" 
                        sx={{ color: 'grey.300', width: 32, height: 32 }} 
                      />
                    </Stack>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                      Based on 143 reviews
                    </Typography>
                    <Stack spacing={2} sx={{ maxWidth: 240, mx: 'auto' }}>
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
                        >
                          <Iconify 
                            icon="solar:star-bold" 
                            sx={{ color: '#FFA726', width: 20, height: 20 }} 
                          />
                          <Box 
                            sx={{ 
                              flex: 1,
                              height: 10,
                              bgcolor: 'grey.200',
                              borderRadius: 1,
                              overflow: 'hidden'
                            }}
                          >
                            <Box 
                              sx={{ 
                                width: `${(rating.count / 143) * 100}%`,
                                height: '100%',
                                bgcolor: '#FFA726',
                              }}
                            />
                          </Box>
                          <Typography variant="body1" sx={{ minWidth: 24, textAlign: 'right' }}>
                            {rating.count}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                  {/* Right Column: Carousel */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h4" sx={{ color: 'common.black', mb: 4, textAlign: 'left', fontWeight: 'bold' }}>
                      Recent Reviews
                    </Typography>
                    <ReviewCarousel />
                  </Box>
                </Box>
              </TabPanel>
            </TabContext>
          </Box>

          {/* Contact & Consultation Footer */}
          <Box 
            id="contact" 
            sx={{ 
              position: 'relative',
              bgcolor: 'background.default',
              py: 8, 
              px: 3, 
              textAlign: 'center',
              overflow: 'hidden',
              mt: 8
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ mb: 2, color: 'text.primary', fontWeight: 'bold' }}
            >
              Get In Touch
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Feel free to reach out for appointments, questions, or collaborations.
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                Contact Us &rarr;
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {phone_number}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {email}
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 6 }}>
              <IconButton color="inherit" href="#" aria-label="Facebook"><Iconify icon="mdi:facebook" width={24} /></IconButton>
              <IconButton color="inherit" href="#" aria-label="Twitter"><Iconify icon="mdi:twitter" width={24} /></IconButton>
              <IconButton color="inherit" href="#" aria-label="Instagram"><Iconify icon="mdi:instagram" width={24} /></IconButton>
              <IconButton color="inherit" href="#" aria-label="YouTube"><Iconify icon="mdi:youtube" width={24} /></IconButton>
            </Stack>
            {/* SVG Landscape Illustration */}
            <Box sx={{ position: 'absolute', left: 0, bottom: 0, width: '100%', zIndex: 0 }}>
              <svg width="100%" height="100" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 80L60 70C120 60 240 40 360 50C480 60 600 100 720 100C840 100 960 60 1080 50C1200 40 1320 60 1380 70L1440 80V100H0V80Z" fill="#F5F5F5"/>
              </svg>
              {/* Blue stag/animal icon in bottom left */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ position: 'absolute', left: 24, bottom: 8 }} xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M10 40L14 36L18 38L22 34L26 36L30 32L34 34L38 30" stroke="#2D3BFF" strokeWidth="2" fill="none"/>
                  <circle cx="14" cy="38" r="3" fill="#2D3BFF"/>
                </g>
              </svg>
            </Box>
          </Box>
        </Container>
    </Box>
  );
}

// Add the ReviewCarousel component at the end of the file
function ReviewCarousel() {
  const reviews = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: "Amazing yoga sessions! The teaching style is so calming and effective. I've seen great improvements in my flexibility and mental peace.",
      time: '2 days ago',
      avatar: '',
    },
    {
      name: 'Michael Chen',
      rating: 5,
      comment: 'The meditation classes have been life-changing. Such a peaceful environment and exceptional guidance.',
      time: '1 week ago',
      avatar: '',
    },
    {
      name: 'Emily Rodriguez',
      rating: 4,
      comment: 'Great experience overall. The pranayama sessions helped me manage stress much better. Highly recommend for beginners.',
      time: '2 weeks ago',
      avatar: '',
    },
  ];
  const [index, setIndex] = React.useState(0);
  const handlePrev = () => setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const handleNext = () => setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  const review = reviews[index];
  return (
    <Box sx={{ position: 'relative', maxWidth: 600, mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'common.white',
          boxShadow: 3,
          borderRadius: 3,
          p: 3,
          minHeight: 120,
          textAlign: 'left',
        }}
      >
        {/* Avatar/Initial */}
        <Box sx={{ mr: 3 }}>
          {review.avatar ? (
            <Avatar src={review.avatar} alt={review.name} sx={{ width: 56, height: 56 }} />
          ) : (
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', color: 'white', fontWeight: 'bold', fontSize: 24 }}>
              {review.name.charAt(0)}
            </Avatar>
          )}
        </Box>
        {/* Review Content */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" sx={{ color: 'common.black', fontWeight: 'bold' }}>{review.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{review.time}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {Array(5).fill(0).map((_, i) => (
              <Iconify
                key={i}
                icon="solar:star-bold"
                sx={{
                  width: 20,
                  height: 20,
                  color: i < review.rating ? '#FFA726' : 'grey.300',
                  mr: i < 4 ? 0.5 : 0,
                }}
              />
            ))}
          </Box>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>{review.comment}</Typography>
        </Box>
      </Box>
      {/* Carousel Dots and Elegant Arrows */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3, gap: 2 }}>
        {/* Elegant Left Arrow */}
        <IconButton
          onClick={handlePrev}
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1.5px solid',
            borderColor: 'grey.300',
            bgcolor: 'background.paper',
            boxShadow: 2,
            mr: 1,
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: 'primary.lighter',
              borderColor: 'primary.main',
              boxShadow: 4,
            },
          }}
          aria-label="Previous review"
        >
          <Iconify icon="solar:arrow-left-bold" width={20} sx={{ color: 'primary.main' }} />
        </IconButton>
        {/* Dots */}
        <Stack direction="row" spacing={1}>
          {reviews.map((_, i) => (
            <Box
              key={i}
              onClick={() => setIndex(i)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: i === index ? 'primary.main' : 'grey.300',
                boxShadow: i === index ? 2 : 0,
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: i === index ? '2px solid #fff' : 'none',
              }}
            />
          ))}
        </Stack>
        {/* Elegant Right Arrow */}
        <IconButton
          onClick={handleNext}
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1.5px solid',
            borderColor: 'grey.300',
            bgcolor: 'background.paper',
            boxShadow: 2,
            ml: 1,
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: 'primary.lighter',
              borderColor: 'primary.main',
              boxShadow: 4,
            },
          }}
          aria-label="Next review"
        >
          <Iconify icon="solar:arrow-right-bold" width={20} sx={{ color: 'primary.main' }} />
        </IconButton>
      </Box>
    </Box>
  );
}
