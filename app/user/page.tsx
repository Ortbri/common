import { Suspense } from 'react';
import Profile from '../../features/user/profile';
import ProfileSkel from '../../features/user/profile-skel';

export default async function UserPage() {
  return (
    <Suspense fallback={<ProfileSkel />}>
      <Profile />
    </Suspense>
  );
}
