import { DashboardSidebar } from '../../components/dashboardSidebar';
import { SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  // TODO:check to see if user is admin

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
