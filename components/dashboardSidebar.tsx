import { Home, Upload } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Uploads',
    url: '/dashboard/uploads',
    icon: Upload,
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* header goes here */}
          <SidebarGroupLabel>Common Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <text>hello there</text>
      </SidebarFooter>
    </Sidebar>
  );
}
