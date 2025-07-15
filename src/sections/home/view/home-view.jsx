import { CONFIG } from 'src/global-config';

import { HomeHero } from '../home-hero';
import { HomeFeatures } from '../home-features';
import { HomePricing } from '../home-pricing';
import { HomeTestimonials } from '../home-testimonials';
import { HomeProcess } from '../home-process';

// ----------------------------------------------------------------------

const metadata = {
  title: `Home - ${CONFIG.appName}`,
  description:
    'Professional dashboard template built with React, Material-UI, and modern web technologies. Create beautiful, responsive dashboards in minutes.',
};

export { metadata };

export function HomeView() {
  return (
    <>
      <HomeHero />
      <HomeProcess />
      <HomeFeatures />
      <HomeTestimonials />
      <HomePricing />
    </>
  );
} 