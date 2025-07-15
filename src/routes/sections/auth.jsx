import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

/** **************************************
 * Jwt
 *************************************** */
const Jwt = {
  PhoneAuthPage: lazy(() => import('src/pages/auth/jwt/phone-auth')),
};

const authJwt = {
  path: 'jwt',
  children: [
    // Phone auth as default
    {
      path: 'phone-auth',
      element: (
        <GuestGuard>
          <AuthSplitLayout
            slotProps={{
              section: { 
                title: 'Welcome to Minimal UI',
                subtitle: 'Enter your phone number to get started'
              },
            }}
          >
            <Jwt.PhoneAuthPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
  ],
};

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: 'auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [authJwt],
  },
];
