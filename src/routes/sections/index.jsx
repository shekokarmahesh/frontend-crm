import { lazy, Suspense } from 'react';

import { MainLayout } from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/home'));
const OnboardingPage = lazy(() => import('src/pages/onboarding'));
const WebsitePage = lazy(() => import('src/pages/website'));
const Page404 = lazy(() => import('src/pages/error/404'));

export const routesSection = [
  {
    path: '/',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <MainLayout>
          <HomePage />
        </MainLayout>
      </Suspense>
    ),
  },

  // Onboarding
  {
    path: '/onboarding',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <OnboardingPage />
      </Suspense>
    ),
  },

  // Website - Full screen practitioner website
  {
    path: '/website',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <WebsitePage />
      </Suspense>
    ),
  },

  // Website with subdomain - For multi-tenant websites
  {
    path: '/website/:subdomain',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <WebsitePage />
      </Suspense>
    ),
  },

  // Auth
  ...authRoutes,

  // Dashboard
  ...dashboardRoutes,

  // No match
  { path: '*', element: <Page404 /> },
];
