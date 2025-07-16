import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

import { paths } from 'src/routes/paths';

import { saveBioAbout, saveBasicInfo, storeAuthToken, debugTokenStatus, saveVisualProfile, getTokenForEndpoint, saveProfessionalDetails, saveExperienceCertifications } from 'src/services/api';

import { Iconify } from 'src/components/iconify';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt/constant';

import { UploadImage } from './upload-image';
import { BannerGallery } from './banner-gallery';
import { ProfilePreview } from './profile-preview';
import { AiSuggestionButton } from './ai-suggestion-button';
import { EnhancedProgressIndicator } from './enhanced-progress-indicator';

// ----------------------------------------------------------------------

// Validation functions
const validateBasicInfo = (data) => {
  const errors = {};
  
  if (!data.firstName?.trim()) errors.firstName = 'First name is required';
  if (!data.lastName?.trim()) errors.lastName = 'Last name is required';
  if (!data.email?.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Invalid email address';
  if (!data.location?.trim()) errors.location = 'Location is required';
  
  return errors;
};

const validateProfessionalDetails = (data) => {
  const errors = {};
  
  if (!data.languages?.length) errors.languages = 'Select at least one language';
  if (!data.teachingStyles?.length) errors.teachingStyles = 'Select at least one teaching style';
  
  return errors;
};

const validateBio = (data) => {
  const errors = {};
  
  if (!data.shortBio?.trim()) errors.shortBio = 'Short bio is required';
  else if (data.shortBio.trim().length < 10) errors.shortBio = 'Short bio must be at least 10 characters';
  
  if (!data.detailedBio?.trim()) errors.detailedBio = 'Detailed bio is required';
  else if (data.detailedBio.trim().length < 50) errors.detailedBio = 'Detailed bio must be at least 50 characters';
  
  return errors;
};

// ----------------------------------------------------------------------

const STEPS = [
  {
    label: 'Basic Information',
    description: 'Tell us about yourself',
    icon: 'solar:user-bold',
  },
  {
    label: 'Visual Profile',
    description: 'Add your photos',
    icon: 'solar:camera-bold',
  },
  {
    label: 'Professional Details',
    description: 'Your expertise & style',
    icon: 'solar:star-bold',
  },
  {
    label: 'Bio & About',
    description: 'Share your story',
    icon: 'solar:document-text-bold',
  },
  {
    label: 'Experience',
    description: 'Your background',
    icon: 'solar:case-bold',
  },
];

const TEACHING_STYLES = [
  'Hatha Yoga',
  'Vinyasa Yoga',
  'Ashtanga Yoga',
  'Kundalini Yoga',
  'Yin Yoga',
  'Hot Yoga',
  'Meditation',
  'Pranayama',
  'Ayurveda',
  'Reiki',
  'Sound Healing',
  'Other',
];

const LANGUAGES = [
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Marathi',
  'Bengali',
  'Gujarati',
  'Kannada',
  'Malayalam',
  'Punjabi',
  'Urdu',
  'Sanskrit',
  'Other',
];

const SPECIALIZATIONS = [
  'Stress Relief',
  'Flexibility',
  'Strength Building',
  'Weight Loss',
  'Spiritual Growth',
  'Mindfulness',
  'Pain Management',
  'Sleep Improvement',
  'Emotional Healing',
  'Chakra Balancing',
  'Other',
];

// ----------------------------------------------------------------------

export function OnboardingFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasCallingData, setHasCallingData] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    profilePicture: '',
    bannerImage: '',
    languages: [],
    teachingStyles: [],
    specializations: [],
    shortBio: '',
    detailedBio: '',
    experiences: [],
    certifications: [],
  });

  // Load pre-filled data on component mount
  useEffect(() => {
    const prefilledData = localStorage.getItem('prefilledData');
    const userData = sessionStorage.getItem('demo_user');
    const onboardingToken = sessionStorage.getItem('onboarding_token');
    const authToken = localStorage.getItem('jwt_access_token');
    
    // Debug token status
    console.log('Onboarding Flow - Token Status:', debugTokenStatus());
    
    // Check if onboarding token exists
    if (!onboardingToken) {
      console.error('No onboarding token found, redirecting to auth');
      window.location.href = '/auth/phone-auth';
      return;
    }
    
    // Check if there's a conflicting auth token
    if (authToken) {
      console.warn('⚠️ Auth token found during onboarding - this might cause conflicts');
      console.log('Auth token:', authToken.substring(0, 20) + '...');
    }
    
    console.log('Onboarding token found:', onboardingToken.substring(0, 20) + '...');
    console.log('Token for onboarding endpoint:', getTokenForEndpoint('/onboarding/step1-basic-info'));
    
    if (prefilledData) {
      try {
        const data = JSON.parse(prefilledData);
        setHasCallingData(true);
        
        // Pre-fill form data
        setFormData(prev => ({
          ...prev,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          location: data.location || '',
        }));
        
        console.log('Loaded pre-filled data from calling system:', data);
      } catch (error) {
        console.error('Error parsing pre-filled data:', error);
      }
    }
    
    // Get calling data from session storage
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.has_calling_data && user.calling_data) {
          setHasCallingData(true);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleNext = async () => {
    // Clear previous validation errors
    setValidationErrors({});
    
    // Validate current step
    let errors = {};
    switch (activeStep) {
      case 0: // Basic Information
        errors = validateBasicInfo(formData);
        break;
      case 1: // Visual Profile (optional step)
        errors = {}; // No validation needed for optional step
        break;
      case 2: // Professional Details
        errors = validateProfessionalDetails(formData);
        break;
      case 3: // Bio & About
        errors = validateBio(formData);
        break;
      case 4: // Experience (optional step)
        errors = {}; // No validation needed for optional step
        break;
      default:
        break;
    }
    
    // If there are validation errors, show them and stop
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      
      // Show first error as alert
      const firstError = Object.values(errors)[0];
      alert(firstError);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Call appropriate API endpoint for current step
      switch (activeStep) {
        case 0: // Basic Information
          await saveBasicInfo(formData);
          // Clear pre-filled data after successful save
          localStorage.removeItem('prefilledData');
          setHasCallingData(false);
          break;
        case 1: // Visual Profile
          await saveVisualProfile(formData);
          break;
        case 2: // Professional Details
          await saveProfessionalDetails(formData);
          break;
        case 3: // Bio & About
          await saveBioAbout(formData);
          break;
        case 4: // Experience (Final Step)
          await handleComplete();
          return;
        default:
          break;
      }
      
      // Move to next step
      setActiveStep(prevStep => prevStep + 1);
      
    } catch (error) {
      console.error('Error saving step data:', error);
      alert(error.error || error.message || 'Failed to save information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Complete final step with experience and certifications
      const response = await saveExperienceCertifications(formData);
      
      // Handle enhanced onboarding completion response
      if (response && (response.onboarding_complete || response.success)) {
        // If API returns new auth token, use it
        if (response.token) {
          storeAuthToken(response.token);
          // Store token in sessionStorage where auth provider expects it
          sessionStorage.setItem(JWT_STORAGE_KEY, response.token);
          localStorage.setItem(JWT_STORAGE_KEY, response.token);
        }
        
        // Clear onboarding token and pre-filled data
        sessionStorage.removeItem('onboarding_token');
        localStorage.removeItem('prefilledData');
        
        // Store completion flag
        localStorage.setItem('onboarding_completed', 'true');
        
        // Update user data with complete profile
        const currentUser = JSON.parse(sessionStorage.getItem('demo_user') || '{}');
        const updatedUser = {
          ...currentUser,
          id: response.facilitator?.id || currentUser.id || 'user',
          email: formData.email || currentUser.email || 'user@example.com',
          displayName: `${formData.firstName} ${formData.lastName}`.trim() || currentUser.displayName || 'User',
          phone: formData.phoneNumber || currentUser.phone,
          role: 'admin',
          photoURL: formData.profilePicture || currentUser.photoURL || null,
          accessToken: response.token || currentUser.accessToken,
          onboarding_completed: true,
          crm_onboarding_completed: true,
          ...formData
        };
        sessionStorage.setItem('demo_user', JSON.stringify(updatedUser));
        
        // Redirect to dashboard
        window.location.href = paths.dashboard.root;
        
      } else {
        // Fallback: Complete onboarding locally even if API doesn't return expected response
        console.warn('API response missing onboarding_complete flag, completing locally');
        
        // Clear onboarding token and pre-filled data
        sessionStorage.removeItem('onboarding_token');
        localStorage.removeItem('prefilledData');
        
        // Store completion flag
        localStorage.setItem('onboarding_completed', 'true');
        
        // Get existing token from session storage
        const existingToken = sessionStorage.getItem(JWT_STORAGE_KEY);
        
        // Update user data
        const currentUser = JSON.parse(sessionStorage.getItem('demo_user') || '{}');
        const updatedUser = {
          ...currentUser,
          onboarding_completed: true,
          crm_onboarding_completed: true,
          accessToken: existingToken || currentUser.accessToken,
          ...formData
        };
        sessionStorage.setItem('demo_user', JSON.stringify(updatedUser));
        
        // Redirect to dashboard
        window.location.href = paths.dashboard.root;
      }
      
    } catch (error) {
      console.error('Failed to complete setup:', error);
      
      // Fallback: If API call fails, still complete onboarding locally
      console.warn('API call failed, completing onboarding locally');
      
      // Clear onboarding token and pre-filled data
      sessionStorage.removeItem('onboarding_token');
      localStorage.removeItem('prefilledData');
      
      // Store completion flag
      localStorage.setItem('onboarding_completed', 'true');
      
      // Get existing token from session storage
      const existingToken = sessionStorage.getItem(JWT_STORAGE_KEY);
      
      // Update user data
      const currentUser = JSON.parse(sessionStorage.getItem('demo_user') || '{}');
      const updatedUser = {
        ...currentUser,
        onboarding_completed: true,
        crm_onboarding_completed: true,
        accessToken: existingToken || currentUser.accessToken,
        ...formData
      };
      sessionStorage.setItem('demo_user', JSON.stringify(updatedUser));
      
      // Redirect to dashboard
      window.location.href = paths.dashboard.root;
      
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        jobTitle: '',
        company: '',
        duration: '',
        description: '',
      }],
    }));
  };

  const updateExperience = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        name: '',
        issuer: '',
        date: '',
        credentialId: '',
      }],
    }));
  };

  const updateCertification = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const removeCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleAiSuggestion = (field, suggestion) => {
    updateFormData(field, suggestion);
  };

  const renderExperienceFields = (experience, index) => (
    <Box key={index} sx={{ mb: 4, position: 'relative' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="primary">
          Experience #{index + 1}
        </Typography>
        <IconButton onClick={() => removeExperience(index)} color="error">
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job Title"
            value={experience.jobTitle || ''}
            onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
            placeholder="e.g. Yoga Instructor"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Company"
            value={experience.company || ''}
            onChange={(e) => updateExperience(index, 'company', e.target.value)}
            placeholder="e.g. Wellness Studio"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Duration"
            value={experience.duration || ''}
            onChange={(e) => updateExperience(index, 'duration', e.target.value)}
            placeholder="e.g. 2020-2023"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={1}
            value={experience.description || ''}
            onChange={(e) => updateExperience(index, 'description', e.target.value)}
            placeholder="Brief description of your role"
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderCertificationFields = (certification, index) => (
    <Box key={index} sx={{ mb: 4, position: 'relative' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="primary">
          Certification #{index + 1}
        </Typography>
        <IconButton onClick={() => removeCertification(index)} color="error">
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Certification Name"
            value={certification.name || ''}
            onChange={(e) => updateCertification(index, 'name', e.target.value)}
            placeholder="e.g. RYT 200"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Issuing Organization"
            value={certification.organization || ''}
            onChange={(e) => updateCertification(index, 'organization', e.target.value)}
            placeholder="e.g. Yoga Alliance"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Date Received"
            value={certification.dateReceived || ''}
            onChange={(e) => updateCertification(index, 'dateReceived', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Credential ID (Optional)"
            value={certification.credentialId || ''}
            onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
            placeholder="e.g. YA123456"
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Tell us about yourself to create your profile
              </Typography>
              
              {/* Calling Data Notice */}
              {hasCallingData && (
                <Alert 
                  severity="info" 
                  sx={{ mb: 3, bgcolor: 'primary.lighter', color: 'primary.darker' }}
                  icon={<Iconify icon="solar:phone-bold" />}
                >
                  <Typography variant="body2">
                    ✅ We found some information from your previous interaction. 
                    Please review and complete the details below.
                  </Typography>
                </Alert>
              )}
              
              <Stack spacing={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      required
                      error={!!validationErrors.firstName}
                      helperText={validationErrors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      required
                      error={!!validationErrors.lastName}
                      helperText={validationErrors.lastName}
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  required
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                  InputProps={{
                    startAdornment: (
                      <Iconify icon="solar:letter-bold" sx={{ mr: 1, color: 'text.secondary' }} />
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Location"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  placeholder="City, State, Country"
                  required
                  error={!!validationErrors.location}
                  helperText={validationErrors.location}
                  InputProps={{
                    startAdornment: (
                      <Iconify icon="solar:map-point-bold" sx={{ mr: 1, color: 'text.secondary' }} />
                    ),
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Visual Profile
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Add photos to make your profile stand out
              </Typography>
              
              <Stack spacing={4}>
                {/* Profile Picture */}
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Profile Picture
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                    <Avatar
                      src={formData.profilePicture}
                      sx={{
                        width: 100,
                        height: 100,
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                      }}
                    >
                      <Iconify icon="solar:user-bold" width={40} />
                    </Avatar>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <UploadImage
                        onUpload={({ previewUrl }) => updateFormData('profilePicture', previewUrl)}
                        helperText="Allowed formats: .jpg, .jpeg, .png, .gif"
                        sx={{ height: 100, width: '100%' }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Banner Image */}
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Banner Image
                  </Typography>
                  
                  <Box
                    sx={{
                      height: 200,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                      borderRadius: 1,
                      overflow: 'hidden',
                      position: 'relative',
                      mb: 3,
                    }}
                  >
                    {formData.bannerImage ? (
                      <Box
                        component="img"
                        src={formData.bannerImage}
                        alt="Banner"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        sx={{ height: '100%' }}
                      >
                        <Iconify
                          icon="solar:gallery-wide-bold"
                          width={48}
                          sx={{ color: 'text.secondary', mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          No banner selected
                        </Typography>
                      </Stack>
                    )}
                  </Box>

                  <Stack spacing={3}>
                    <UploadImage
                      onUpload={({ previewUrl }) => updateFormData('bannerImage', previewUrl)}
                      helperText="Recommended size: 1920x400 pixels"
                      sx={{ height: 'auto', py: 2.5 }}
                    />

                    <Divider>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        OR
                      </Typography>
                    </Divider>

                    <BannerGallery
                      selected={formData.bannerImage}
                      onSelect={(url) => updateFormData('bannerImage', url)}
                    />
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Professional Details
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Tell us about your expertise and teaching style
              </Typography>
              
              <Stack spacing={3}>
                <FormControl fullWidth error={!!validationErrors.languages}>
                  <InputLabel>Languages You Speak *</InputLabel>
                  <Select
                    multiple
                    value={formData.languages}
                    onChange={(e) => updateFormData('languages', e.target.value)}
                    input={<OutlinedInput label="Languages You Speak *" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {LANGUAGES.map((language) => (
                      <MenuItem key={language} value={language}>
                        {language}
                      </MenuItem>
                    ))}
                  </Select>
                  {validationErrors.languages && (
                    <FormHelperText>{validationErrors.languages}</FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={!!validationErrors.teachingStyles}>
                  <InputLabel>Teaching Styles *</InputLabel>
                  <Select
                    multiple
                    value={formData.teachingStyles}
                    onChange={(e) => updateFormData('teachingStyles', e.target.value)}
                    input={<OutlinedInput label="Teaching Styles *" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {TEACHING_STYLES.map((style) => (
                      <MenuItem key={style} value={style}>
                        {style}
                      </MenuItem>
                    ))}
                  </Select>
                  {validationErrors.teachingStyles && (
                    <FormHelperText>{validationErrors.teachingStyles}</FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Specializations</InputLabel>
                  <Select
                    multiple
                    value={formData.specializations}
                    onChange={(e) => updateFormData('specializations', e.target.value)}
                    input={<OutlinedInput label="Specializations" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {SPECIALIZATIONS.map((spec) => (
                      <MenuItem key={spec} value={spec}>
                        {spec}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Optional: Select areas you specialize in</FormHelperText>
                </FormControl>
              </Stack>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Stack spacing={3}>
            <Typography variant="h6">Tell us about yourself</Typography>
            
            <FormControl error={!!validationErrors.shortBio} sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Short Bio"
                placeholder="Write a brief introduction about yourself (10-150 characters)"
                value={formData.shortBio}
                onChange={(e) => updateFormData('shortBio', e.target.value)}
                error={!!validationErrors.shortBio}
                helperText={validationErrors.shortBio}
              />
              <AiSuggestionButton onSuggest={handleAiSuggestion} field="shortBio" />
            </FormControl>

            <FormControl error={!!validationErrors.detailedBio} sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="About You"
                placeholder="Share your detailed story, experience, and what makes you unique (50-500 characters)"
                value={formData.detailedBio}
                onChange={(e) => updateFormData('detailedBio', e.target.value)}
                error={!!validationErrors.detailedBio}
                helperText={validationErrors.detailedBio}
              />
              <AiSuggestionButton onSuggest={handleAiSuggestion} field="detailedBio" />
            </FormControl>
          </Stack>
        );

      case 4: // Experience & Certifications
        return (
          <Stack spacing={4}>
            <Box>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h6">Work Experience</Typography>
                <Button
                  startIcon={<Iconify icon="solar:add-circle-bold" />}
                  onClick={addExperience}
                >
                  Add Experience
                </Button>
              </Stack>
              {formData.experiences.map((exp, index) => renderExperienceFields(exp, index))}
            </Box>

            <Divider />

            <Box>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h6">Certifications</Typography>
                <Button
                  startIcon={<Iconify icon="solar:add-circle-bold" />}
                  onClick={addCertification}
                >
                  Add Certification
                </Button>
              </Stack>
              {formData.certifications.map((cert, index) => renderCertificationFields(cert, index))}
            </Box>
          </Stack>
        );

      default:
        return null;
    }
  };

  // Celebration screen is now bypassed - redirecting directly to website
  // if (showCelebration) {
  //   return <CelebrationScreen onContinue={handleCelebrationContinue} />;
  // }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: (theme) => alpha(theme.palette.primary.lighter, 0.08),
      }}
    >
      {/* Left Panel - Preview (40% width on desktop, hidden on mobile) */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          width: { lg: '40%' },
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 480,
            height: '100vh',
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: (theme) => theme.customShadows.z24,
            overflow: 'hidden',
          }}
        >
          <ProfilePreview formData={formData} />
        </Box>
      </Box>

      {/* Right Panel - Form Content (60% width on desktop, full width on mobile) */}
      <Box
        sx={{
          width: { xs: '100%', lg: '60%' },
          p: { xs: 2, md: 4 },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Create Your Profile
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Complete the steps below to set up your facilitator profile
          </Typography>
        </Box>

        {/* Enhanced Progress Indicator */}
        <EnhancedProgressIndicator 
          activeStep={activeStep}
          hasCallingData={hasCallingData}
          callingData={JSON.parse(sessionStorage.getItem('demo_user') || '{}').calling_data}
          totalSteps={STEPS.length}
        />

        {/* Form Content - Scrollable */}
        <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 10 }}>
          {renderStepContent(activeStep)}
        </Box>

        {/* Navigation Buttons - Fixed at bottom */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: { xs: '100%', lg: '60%' },
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider',
            p: 2.5,
            zIndex: 1000,
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Back
            </Button>

            <Button
              variant="contained"
              disabled={isLoading}
              onClick={handleNext}
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            >
              {isLoading ? 'Saving...' : activeStep === STEPS.length - 1 ? 'Complete' : 'Continue'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
} 