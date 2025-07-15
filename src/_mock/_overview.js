import { today } from 'src/utils/format-time';

import { _mock } from './_mock';

// APP
// ----------------------------------------------------------------------

export const _appFeatured = [
  {
    id: 'tip-1',
    title: 'Offer a Free Introductory Session',
    description:
      'Attract new students by providing a short free class. It lowers the barrier to entry and showcases your unique teaching style.',
    coverUrl: _mock.image.cover(1),
  },
  {
    id: 'tip-2',
    title: 'Engage With Your Online Community',
    description:
      'Share insights, answer questions, and be active on social platforms to build trust and visibility among potential practitioners.',
    coverUrl: _mock.image.cover(2),
  },
  {
    id: 'tip-3',
    title: 'Collect Feedback & Testimonials',
    description:
      'Ask existing students for honest feedback and publish testimonials to boost credibility and attract new learners.',
    coverUrl: _mock.image.cover(3),
  },
];

export const _appInvoices = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  invoiceNumber: `INV-${_mock.number.nativeS(index)}`,
  category: _mock.category(index),
  price: _mock.number.price(index),
  status: ['paid', 'progress', 'out of date'][index % 3],
}));

export const _analyticsTasks = [
  { id: '1', name: 'Create FireStone Logo' },
  { id: '2', name: 'Add SCSS and JS files if required' },
  { id: '3', name: 'Stakeholder Meeting' },
  { id: '4', name: 'Scoping & Estimations' },
  { id: '5', name: 'Sprint Showcase' },
  { id: '6', name: 'Update User Documentation' },
  { id: '7', name: 'QA Testing for New Features' },
];

// COURSE
// ----------------------------------------------------------------------

export const _coursesContinue = Array.from({ length: 4 }, (_, index) => ({
  id: _mock.id(index),
  title: _mock.courseNames(index),
  coverUrl: _mock.image.course(index),
  totalLesson: 12,
  currentLesson: index + 7,
}));

export const _coursesFeatured = Array.from({ length: 6 }, (_, index) => ({
  id: _mock.id(index),
  title: _mock.courseNames(index),
  coverUrl: _mock.image.course(index + 6),
  totalDuration: 220,
  totalStudents: _mock.number.nativeM(index),
  price: _mock.number.price(index),
}));

export const _coursesReminder = Array.from({ length: 4 }, (_, index) => ({
  id: _mock.id(index),
  title: _mock.courseNames(index),
  totalLesson: 12,
  reminderAt: today(),
  currentLesson: index + 7,
}));
