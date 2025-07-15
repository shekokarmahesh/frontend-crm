import { CONFIG } from 'src/global-config';

import { JwtPhoneAuthView } from 'src/auth/view/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `Phone Auth | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <JwtPhoneAuthView />
    </>
  );
} 