import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Iconify } from 'src/components/iconify';
import { alpha } from '@mui/material/styles';

export function AiSuggestionButton({ onSuggest, field }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      // Here we would make an API call to get AI suggestions
      // For now, let's simulate with some example responses
      const suggestions = {
        shortBio: "Passionate yoga instructor with 5+ years of experience in mindfulness and holistic wellness. Dedicated to helping others find balance and inner peace through personalized practice.",
        detailedBio: "My journey into yoga and wellness began as a personal quest for balance in a fast-paced world. Over the past 5+ years, I've transformed this passion into a mission to help others discover the life-changing benefits of mindful movement and meditation. Certified in multiple yoga traditions, I specialize in creating personalized practices that adapt to each individual's unique needs and goals. Whether you're seeking stress relief, physical strength, or spiritual growth, I'm here to guide you on your wellness journey with compassion and expertise. My teaching philosophy combines traditional wisdom with modern scientific understanding, ensuring a well-rounded approach to health and wellness."
      };
      
      onSuggest(field, suggestions[field]);
    } catch (error) {
      console.error('Error getting AI suggestion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip title="Use AI to get suggestions" arrow>
      <IconButton
        onClick={handleClick}
        disabled={isLoading}
        sx={{
          position: 'absolute',
          right: 8,
          bottom: 8,
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
          },
        }}
      >
        <Iconify
          icon={isLoading ? 'eos-icons:loading' : 'solar:magic-stick-3-bold'}
          width={20}
          sx={{
            animation: isLoading ? 'spin 1s linear infinite' : 'none',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />
      </IconButton>
    </Tooltip>
  );
} 