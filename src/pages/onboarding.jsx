import { OnboardingFlow } from 'src/components/onboarding/onboarding-flow';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Complete Your Profile - Minimal UI',
  description: 'Set up your professional profile to get started with your dashboard',
};

export default function OnboardingPage() {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />

      <OnboardingFlow />
    </>
  );
} 