import { ReactNode } from 'react';
import UserHeader from '../../components/userHeader';
export default async function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col">
      <UserHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
