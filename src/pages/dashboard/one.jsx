import { CONFIG } from 'src/global-config';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

import { SeoIllustration } from 'src/assets/illustrations';
import { _appFeatured, _appInvoices, _analyticsTasks } from 'src/_mock/_overview';
import { useMockedUser } from 'src/auth/hooks';
import { AppWelcome } from 'src/sections/overview/app/app-welcome';
import { AppWelcomeCarousel } from 'src/sections/overview/app/app-welcome-carousel';
import { AppFeatured } from 'src/sections/overview/app/app-featured';
import { MeditationBanner } from 'src/sections/overview/app/meditation-banner';
import { AppNewInvoices } from 'src/sections/overview/app/app-new-invoices';
import { AnalyticsTasks } from 'src/sections/overview/analytics/analytics-tasks';
import { AppWidgetSummary } from 'src/sections/overview/app/app-widget-summary';
import { EcommerceSaleByGender } from 'src/sections/overview/e-commerce/ecommerce-sale-by-gender';
import { EcommerceYearlySales } from 'src/sections/overview/e-commerce/ecommerce-yearly-sales';

// ----------------------------------------------------------------------

const metadata = { title: `Page one | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { user } = useMockedUser();
  const theme = useTheme();

  return (
    <>
      <title>{metadata.title}</title>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <AppWelcomeCarousel
              items={[
                {
                  title: 'Complete Your Profile',
                  description:
                    'Add your bio, certificates, and profile photo to attract more students and build trust',
                  action: 'Complete Profile',
                  img: <SeoIllustration hideBackground />,
                },
                {
                  title: 'Create Your First Offering',
                  description:
                    'Set up a yoga session, meditation class, or workshop to start accepting bookings',
                  action: 'Create Offering',
                  img: <SeoIllustration hideBackground />,
                },
                {
                  title: 'Invite Your First Students',
                  description:
                    'Share your profile link and start building your community of practice',
                  action: 'Share Profile',
                  img: <SeoIllustration hideBackground />,
                },
                {
                  title: 'Monthly Self-Evaluation',
                  description:
                    'Take a moment to reflect on your teaching journey and set new intentions',
                  action: 'Start Reflection',
                  img: <SeoIllustration hideBackground />,
                },
                {
                  title: 'Recharge Your Blessings',
                  description:
                    'Get more blessings to unlock premium features and boost your visibility',
                  action: 'Recharge Now',
                  img: <SeoIllustration hideBackground />,
                },
              ]}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <AppFeatured list={_appFeatured} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <MeditationBanner />
          </Grid>

          <Grid size={{ xs: 12, lg: 8 }}>
            <AppNewInvoices
              title="Today's overview"
              tableData={_appInvoices}
              headCells={[
                { id: 'id', label: 'Invoice ID' },
                { id: 'category', label: 'Category' },
                { id: 'price', label: 'Price' },
                { id: 'status', label: 'Status' },
                { id: '' },
              ]}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <AnalyticsTasks
              title="To do List"
              subheader="Important tasks to complete"
              list={_analyticsTasks}
            />
          </Grid>

          {/* AppWidgetSummary cards */}
          <Grid size={{ xs: 12, md: 4 }}>
            <AppWidgetSummary
              title="No. of clients"
              percent={2.6}
              total={18765}
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [15, 18, 12, 51, 68, 11, 39, 37],
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <AppWidgetSummary
              title="Session"
              percent={0.2}
              total={4876}
              chart={{
                colors: [theme.palette.info.main],
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [20, 41, 63, 33, 28, 35, 50, 46],
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <AppWidgetSummary
              title="Earnings"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.error.main],
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [18, 19, 31, 8, 16, 37, 12, 33],
              }}
            />
          </Grid>

          {/* Ecommerce components */}

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <EcommerceSaleByGender
              title="Active Offerings"
              total={2324}
              chart={{
                series: [
                  { label: 'Mens', value: 25 },
                  { label: 'Womens', value: 50 },
                  { label: 'Kids', value: 75 },
                ],
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 8 }}>
            <EcommerceYearlySales
              title="Clients gained and Money spent"
              subheader="(+43%) than last year"
              chart={{
                categories: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                series: [
                  {
                    name: '2022',
                    data: [
                      {
                        name: 'Total income',
                        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                      },
                      {
                        name: 'Total expenses',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                      },
                    ],
                  },
                  {
                    name: '2023',
                    data: [
                      {
                        name: 'Total income',
                        data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                      },
                      {
                        name: 'Total expenses',
                        data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
