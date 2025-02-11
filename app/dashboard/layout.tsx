import AdminHeader from '../../features/admin/adminHeader';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-1 flex-col">
      <AdminHeader />
      {children}
    </main>
  );
}
