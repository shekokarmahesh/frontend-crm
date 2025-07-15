import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/global-config';

import { CalendarView } from 'src/sections/calendar/view';

// ----------------------------------------------------------------------

export default function CalendarPage() {
  return (
    <>
      <Helmet>
        <title>{`Calendar | Dashboard - ${CONFIG.appName}`}</title>
      </Helmet>

      <CalendarView />
    </>
  );
}
