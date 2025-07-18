import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';
import { _userList } from 'src/_mock/_user';

import { UserEditView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

const metadata = { title: `User edit | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const currentUser = _userList.find((user) => user.id === id);

  return (
    <>
      <title>{metadata.title}</title>

      <UserEditView user={currentUser} />
    </>
  );
} 