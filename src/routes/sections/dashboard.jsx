import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AccountLayout } from 'src/sections/account/account-layout';

import { AuthGuard } from 'src/auth/guard';

import { usePathname } from '../hooks';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));

// User Management Pages
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));

// Account Pages
const AccountGeneralPage = lazy(() => import('src/pages/dashboard/user/account/general'));
const AccountBillingPage = lazy(() => import('src/pages/dashboard/user/account/billing'));
const AccountSocialsPage = lazy(() => import('src/pages/dashboard/user/account/socials'));
const AccountNotificationsPage = lazy(() => import('src/pages/dashboard/user/account/notifications'));
const AccountChangePasswordPage = lazy(() => import('src/pages/dashboard/user/account/change-password'));

// Course Management Pages
const CoursesPage = lazy(() => import('src/pages/dashboard/courses'));
const CourseCreatePage = lazy(() => import('src/pages/dashboard/course-create'));
const CourseOverviewPage = lazy(() => import('src/pages/dashboard/course'));

// Communication Pages
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));

// File Management Pages
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));

// WhatsApp Integration Pages
const WhatsAppTestPage = lazy(() => import('src/pages/dashboard/whatsapp-test'));

// Calendar Pages
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));

// ----------------------------------------------------------------------

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

const accountLayout = () => (
  <AccountLayout>
    <SuspenseOutlet />
  </AccountLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'group',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
      // User Management Routes
      {
        path: 'user',
        children: [
          { index: true, element: <UserProfilePage /> },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          {
            path: 'account',
            element: accountLayout(),
            children: [
              { index: true, element: <AccountGeneralPage /> },
              { path: 'billing', element: <AccountBillingPage /> },
              { path: 'notifications', element: <AccountNotificationsPage /> },
              { path: 'socials', element: <AccountSocialsPage /> },
              { path: 'change-password', element: <AccountChangePasswordPage /> },
            ],
          },
        ],
      },
      // Course Management Routes
      { path: 'course', element: <CourseOverviewPage /> },
      { path: 'courses', element: <CoursesPage /> },
      { path: 'courses/create', element: <CourseCreatePage /> },
      { path: 'courses/edit/:id', element: <CourseCreatePage /> },
      { path: 'courses/:id', element: <CourseOverviewPage /> },
      // Communication Routes
      { path: 'chat', element: <ChatPage /> },
      // File Management Routes
      { path: 'file', element: <OverviewFilePage /> },
      { path: 'file-manager', element: <FileManagerPage /> },
      // WhatsApp Integration Routes
      { path: 'whatsapp-test', element: <WhatsAppTestPage /> },
      // Calendar Routes
      { path: 'calendar', element: <CalendarPage /> },
    ],
  },
];
