import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  params: icon('ic-params'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  subpaths: icon('ic-subpaths'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      {
        title: 'Dashboard',
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
      },
      {
        title: 'Website Preview',
        path: paths.website,
        icon: ICONS.external,
      },
    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'User',
        path: paths.dashboard.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Profile', path: paths.dashboard.user.root },
          { title: 'List', path: paths.dashboard.user.list },
          { title: 'Create', path: paths.dashboard.user.new },
          { title: 'Account', path: paths.dashboard.user.account },
        ],
      },
      {
        title: 'Group',
        path: paths.dashboard.group.root,
        icon: ICONS.user,
        children: [
          { title: 'Four', path: paths.dashboard.group.root },
          { title: 'Five', path: paths.dashboard.group.five },
          { title: 'Six', path: paths.dashboard.group.six },
        ],
      },
    ],
  },
  /**
   * Media Library
   */
  {
    subheader: 'Media Library',
    items: [
      {
        title: 'Media Library',
        path: paths.dashboard.file,
        icon: ICONS.folder,
        children: [
          { title: 'File', path: paths.dashboard.file },
          { title: 'File Manager', path: paths.dashboard.fileManager },
        ],
      },
    ],
  },
  /**
   * Course Management
   */
  {
    subheader: 'Course Management',
    items: [
      {
        title: 'Course Overview',
        path: paths.dashboard.course,
        icon: ICONS.course,
      },
      {
        title: 'Courses',
        path: paths.dashboard.courses.root,
        icon: ICONS.course,
        children: [
          { title: 'All Courses', path: paths.dashboard.courses.root },
          { title: 'Create Course', path: paths.dashboard.courses.create },
        ],
      },
    ],
  },
  /**
   * Communication
   */
  {
    subheader: 'Communication',
    items: [
      { title: 'Chat', path: paths.dashboard.chat, icon: ICONS.chat },
      { title: 'Calendar', path: paths.dashboard.calendar, icon: ICONS.calendar },
      {
        title: 'WhatsApp Test',
        path: paths.dashboard.whatsapp.test,
        icon: ICONS.mail,
      },
    ],
  },
];
