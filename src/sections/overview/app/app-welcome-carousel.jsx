import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { CarouselArrowBasicButtons } from 'src/components/carousel';

import { AppWelcome } from './app-welcome';

// ----------------------------------------------------------------------

export function AppWelcomeCarousel({ items, sx, ...other }) {
  const [current, setCurrent] = useState(0);

  const total = items.length;

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const { title, description, action, img } = items[current];

  return (
    <Box sx={{ position: 'relative', height: 1, ...sx }} {...other}>
      {/* Arrows */}
      <CarouselArrowBasicButtons
        onClickPrev={goPrev}
        onClickNext={goNext}
        sx={{ top: 8, right: 8, position: 'absolute', color: 'common.white' }}
      />

      {/* Banner */}
      <AppWelcome
        title={title}
        description={description}
        action={action && <Button variant="contained" color="primary">{action}</Button>}
        img={img}
        sx={{ height: 1 }}
      />
    </Box>
  );
} 