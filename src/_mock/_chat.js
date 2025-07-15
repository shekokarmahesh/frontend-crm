import { _mock } from './_mock';

// CHAT
// ----------------------------------------------------------------------

export const _chatContacts = Array.from({ length: 20 }, (_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index % 10), // Use modulo to cycle through available names
  username: (_mock.fullName(index % 10) || 'User').toLowerCase().replace(/\s+/g, '.'),
  avatarUrl: _mock.image.avatar(index % 10),
  address: _mock.fullAddress(index % 10),
  phoneNumber: _mock.phoneNumber(index % 10),
  email: _mock.email(index % 10),
  lastActivity: _mock.time(index % 10),
  status: ['online', 'away', 'busy', 'offline'][index % 4],
  role: _mock.role(index % 10),
}));

export const _conversations = [
  {
    id: 'conversation-1',
    type: 'ONE_TO_ONE',
    unreadCount: 2,
    participants: [
      {
        id: _chatContacts[0].id,
        name: _chatContacts[0].name,
        username: _chatContacts[0].username,
        avatarUrl: _chatContacts[0].avatarUrl,
        address: _chatContacts[0].address,
        phoneNumber: _chatContacts[0].phoneNumber,
        email: _chatContacts[0].email,
        lastActivity: _chatContacts[0].lastActivity,
        status: _chatContacts[0].status,
        role: _chatContacts[0].role,
      },
    ],
    messages: [
      {
        id: 'message-1',
        body: 'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        contentType: 'text',
        attachments: [],
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        senderId: _chatContacts[0].id,
      },
      {
        id: 'message-2',
        body: 'The waves crashed against the shore, creating a soothing symphony of sound.',
        contentType: 'text',
        attachments: [],
        createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
        senderId: 'user-1',
      },
      {
        id: 'message-3',
        body: 'The scent of blooming flowers wafted through the garden, creating a fragrant paradise.',
        contentType: 'text',
        attachments: [],
        createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
        senderId: _chatContacts[0].id,
      },
    ],
  },
  {
    id: 'conversation-2',
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    participants: [
      {
        id: _chatContacts[1].id,
        name: _chatContacts[1].name,
        username: _chatContacts[1].username,
        avatarUrl: _chatContacts[1].avatarUrl,
        address: _chatContacts[1].address,
        phoneNumber: _chatContacts[1].phoneNumber,
        email: _chatContacts[1].email,
        lastActivity: _chatContacts[1].lastActivity,
        status: _chatContacts[1].status,
        role: _chatContacts[1].role,
      },
    ],
    messages: [
      {
        id: 'message-4',
        body: 'The scent of blooming flowers wafted through the garden, creating a fragrant paradise.',
        contentType: 'text',
        attachments: [],
        createdAt: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString(),
        senderId: _chatContacts[1].id,
      },
      {
        id: 'message-5',
        body: 'I loved the concert! The music was amazing.',
        contentType: 'text',
        attachments: [],
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        senderId: 'user-1',
      },
    ],
  },
  {
    id: 'conversation-3',
    type: 'ONE_TO_ONE',
    unreadCount: 1,
    participants: [
      {
        id: _chatContacts[2].id,
        name: _chatContacts[2].name,
        username: _chatContacts[2].username,
        avatarUrl: _chatContacts[2].avatarUrl,
        address: _chatContacts[2].address,
        phoneNumber: _chatContacts[2].phoneNumber,
        email: _chatContacts[2].email,
        lastActivity: _chatContacts[2].lastActivity,
        status: _chatContacts[2].status,
        role: _chatContacts[2].role,
      },
    ],
    messages: [
      {
        id: 'message-6',
        body: 'Looking forward to our meeting tomorrow!',
        contentType: 'text',
        attachments: [],
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        senderId: _chatContacts[2].id,
      },
    ],
  },
  {
    id: 'conversation-4',
    type: 'GROUP',
    unreadCount: 0,
    participants: [
      {
        id: _chatContacts[3].id,
        name: _chatContacts[3].name,
        username: _chatContacts[3].username,
        avatarUrl: _chatContacts[3].avatarUrl,
        address: _chatContacts[3].address,
        phoneNumber: _chatContacts[3].phoneNumber,
        email: _chatContacts[3].email,
        lastActivity: _chatContacts[3].lastActivity,
        status: _chatContacts[3].status,
        role: _chatContacts[3].role,
      },
      {
        id: _chatContacts[4].id,
        name: _chatContacts[4].name,
        username: _chatContacts[4].username,
        avatarUrl: _chatContacts[4].avatarUrl,
        address: _chatContacts[4].address,
        phoneNumber: _chatContacts[4].phoneNumber,
        email: _chatContacts[4].email,
        lastActivity: _chatContacts[4].lastActivity,
        status: _chatContacts[4].status,
        role: _chatContacts[4].role,
      },
      {
        id: _chatContacts[5].id,
        name: _chatContacts[5].name,
        username: _chatContacts[5].username,
        avatarUrl: _chatContacts[5].avatarUrl,
        address: _chatContacts[5].address,
        phoneNumber: _chatContacts[5].phoneNumber,
        email: _chatContacts[5].email,
        lastActivity: _chatContacts[5].lastActivity,
        status: _chatContacts[5].status,
        role: _chatContacts[5].role,
      },
    ],
    messages: [
      {
        id: 'message-7',
        body: 'Team meeting at 3 PM today.',
        contentType: 'text',
        attachments: [],
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        senderId: _chatContacts[3].id,
      },
      {
        id: 'message-8',
        body: 'Sure, I will be there!',
        contentType: 'text',
        attachments: [],
        createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
        senderId: _chatContacts[4].id,
      },
      {
        id: 'message-9',
        body: _mock.image.cover(4),
        contentType: 'image',
        attachments: [
          {
            name: 'cover-4.jpg',
            size: 2048576,
            type: 'image/jpeg',
            preview: _mock.image.cover(4),
          },
        ],
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        senderId: _chatContacts[5].id,
      },
    ],
  },
  {
    id: 'conversation-5',
    type: 'ONE_TO_ONE',
    unreadCount: 3,
    participants: [
      {
        id: _chatContacts[6].id,
        name: _chatContacts[6].name,
        username: _chatContacts[6].username,
        avatarUrl: _chatContacts[6].avatarUrl,
        address: _chatContacts[6].address,
        phoneNumber: _chatContacts[6].phoneNumber,
        email: _chatContacts[6].email,
        lastActivity: _chatContacts[6].lastActivity,
        status: _chatContacts[6].status,
        role: _chatContacts[6].role,
      },
    ],
    messages: [
      {
        id: 'message-10',
        body: 'cover-5.jpg',
        contentType: 'image',
        attachments: [
          {
            name: 'cover-5.jpg',
            size: 1048576,
            type: 'image/jpeg',
            preview: _mock.image.cover(5),
          },
        ],
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        senderId: _chatContacts[6].id,
      },
      {
        id: 'message-11',
        body: 'expenses-2015-company.csv',
        contentType: 'file',
        attachments: [
          {
            name: 'expenses-2015-company.csv',
            size: 512000,
            type: 'text/csv',
            preview: null,
          },
        ],
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        senderId: _chatContacts[6].id,
      },
      {
        id: 'message-12',
        body: 'money-popup-crack.pdf',
        contentType: 'file',
        attachments: [
          {
            name: 'money-popup-crack.pdf',
            size: 2097152,
            type: 'application/pdf',
            preview: null,
          },
        ],
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        senderId: _chatContacts[6].id,
      },
    ],
  },
];

// Simulate messages with attachments for the current conversation
export const _messagesWithAttachments = [
  {
    id: 'message-13',
    body: 'cover-4.jpg',
    contentType: 'image',
    attachments: [
      {
        name: 'cover-4.jpg',
        size: 1048576,
        type: 'image/jpeg',
        preview: _mock.image.cover(4),
      },
    ],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    senderId: _chatContacts[0].id,
  },
  {
    id: 'message-14',
    body: 'cover-6.jpg',
    contentType: 'image',
    attachments: [
      {
        name: 'cover-6.jpg',
        size: 1572864,
        type: 'image/jpeg',
        preview: _mock.image.cover(6),
      },
    ],
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    senderId: _chatContacts[0].id,
  },
  {
    id: 'message-15',
    body: 'large-news.txt',
    contentType: 'file',
    attachments: [
      {
        name: 'large-news.txt',
        size: 512000,
        type: 'text/plain',
        preview: null,
      },
    ],
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    senderId: _chatContacts[0].id,
  },
];
