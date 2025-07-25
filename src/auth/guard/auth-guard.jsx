import { useState, useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

const signInPaths = {
  jwt: paths.auth.jwt.phoneAuth,
  auth0: paths.auth.auth0.signIn,
  amplify: paths.auth.amplify.signIn,
  firebase: paths.auth.firebase.signIn,
  supabase: paths.auth.supabase.signIn,
};

export function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { authenticated, loading } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const createRedirectPath = (currentPath) => {
    const queryString = new URLSearchParams({ returnTo: pathname }).toString();
    return `${currentPath}?${queryString}`;
  };

  const checkPermissions = async () => {
    if (loading) {
      return;
    }

    if (!authenticated) {
      const { method } = CONFIG.auth;

      const signInPath = signInPaths[method];
      const redirectPath = createRedirectPath(signInPath);

      router.replace(redirectPath);

      return;
    }

    // Check if onboarding is completed for new users
    const onboardingCompleted = localStorage.getItem('onboarding_completed');
    
    // Only redirect to onboarding if user is authenticated but hasn't completed onboarding
    // and we're not already on the onboarding page
    if (authenticated && !onboardingCompleted && pathname !== paths.onboarding) {
      console.log('User authenticated but onboarding not completed, redirecting to onboarding');
      router.replace(paths.onboarding);
      return;
    }
    
    // If user has completed onboarding but is on the onboarding page, redirect to dashboard
    if (authenticated && onboardingCompleted && pathname === paths.onboarding) {
      console.log('User has completed onboarding, redirecting to dashboard');
      router.replace(paths.dashboard.root);
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
