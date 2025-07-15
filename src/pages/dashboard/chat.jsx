import { CONFIG } from 'src/global-config';

import { ChatView } from 'src/sections/chat/view';

// ----------------------------------------------------------------------

const metadata = { title: `Chat - ${CONFIG.appName}` };

export default function Page() {
  // Set document title manually for now (React 19 compatibility)
  if (typeof document !== 'undefined') {
    document.title = metadata.title;
  }

  return <ChatView />;
} 