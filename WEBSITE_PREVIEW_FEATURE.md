# Website Preview Feature

This feature allows users to view their professional website in full-screen mode after completing the onboarding process.

## 🌟 Features

- **Full-screen Website View**: Display practitioner profiles without browser headers
- **User Data Integration**: Uses data from the 5-step onboarding process
- **Mock Data Fallback**: Shows professional-looking content even if some data is missing
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Multiple Access Points**: Can be accessed from dashboard navigation or celebration screen

## 🎯 How to Access

### 1. From Dashboard Navigation
- Complete the 5-step onboarding process
- Go to Dashboard
- Click "Website Preview" in the left navigation menu

### 2. From Onboarding Completion
- After completing the onboarding process
- On the celebration screen, click "View Website" button
- This opens the website in a new tab

### 3. Direct URL Access
- Visit `/website` for current user's website
- Visit `/website/:subdomain` for specific practitioner websites (future multi-tenant support)

## 📋 Data Sources

The website displays data from the onboarding process:

### Step 1: Basic Information
- Name (first & last)
- Email
- Location
- Phone number

### Step 2: Visual Profile
- Profile picture
- Banner image

### Step 3: Professional Details
- Teaching styles
- Specializations  
- Languages

### Step 4: Bio & About
- Short bio
- Detailed introduction

### Step 5: Experience & Certifications
- Work experiences
- Professional certifications

## 🎨 Website Sections

The full-screen website includes:

1. **Hero Section**: Banner image with professional branding
2. **Offerings & Courses**: Service cards with pricing (mock data)
3. **Profile Section**: Name, photo, specializations, location
4. **About Me**: Bio and detailed introduction
5. **Experience Tab**: Professional work history
6. **Certifications Tab**: Professional qualifications
7. **Reviews Tab**: Mock reviews and ratings
8. **Gallery**: Image showcase
9. **Retreats & Events**: Upcoming programs (mock data)
10. **Contact Section**: Phone, email, social media links

## 🛠️ Technical Implementation

### Components Created:
- `src/pages/website.jsx` - Main page component
- `src/sections/website/website-view.jsx` - Full website display component
- `src/components/website/view-website-button.jsx` - Reusable button component

### Routes Added:
- `/website` - Current user's website
- `/website/:subdomain` - Multi-tenant support for future use

### Navigation Updated:
- Added "Website Preview" to dashboard navigation
- Added "View Website" button to onboarding celebration screen

## 🔮 Future Enhancements

### Backend Integration
- Connect to `/api/website/public/:subdomain` endpoint
- Real offerings data from facilitator profile
- Dynamic subdomain generation

### Customization Options
- Theme customization
- Layout templates
- Custom domain support

### Publishing Features
- Website publishing workflow
- SEO optimization
- Analytics integration

## 💡 Usage Examples

### Basic Usage in Components
```jsx
import { ViewWebsiteButton } from 'src/components/website';

// Simple button
<ViewWebsiteButton />

// Icon button
<ViewWebsiteButton variant="icon" size="small" />

// With custom styling
<ViewWebsiteButton 
  variant="outlined" 
  sx={{ borderRadius: 2 }} 
/>

// For specific subdomain
<ViewWebsiteButton subdomain="practitioner-name" />
```

### Preview Card Component
```jsx
import { PreviewWebsiteCard } from 'src/components/website';

<PreviewWebsiteCard 
  title="Your Website is Live!"
  description="Share your professional website with clients"
/>
```

## 🚀 Getting Started

1. **Complete Onboarding**: Ensure you've completed all 5 steps of the onboarding process
2. **Access Website**: Use any of the access methods mentioned above
3. **Share Your Website**: Use the generated URL to share your professional profile

The website will automatically use your onboarding data and fill in any missing information with professional mock data to ensure a complete, polished appearance.

## 🎭 Mock Data

The website includes high-quality mock data for:
- Course offerings with realistic pricing
- Professional gallery images
- Customer reviews and ratings
- Upcoming retreats and events

This ensures that even newly registered practitioners have a professional-looking website immediately after onboarding.
