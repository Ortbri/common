import { Box, ChartArea, Upload } from 'lucide-react';

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
    title: 'Dashboard',
    url: '/dashboard',
    icon: ChartArea,
  },
  {
    title: 'Collection',
    url: '/dashboard/collection',
    icon: Box,
  },
  {
    title: 'Upload',
    url: '/dashboard/upload',
    icon: Upload,
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* header goes here */}
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
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
        <div className="flex items-center gap-3 rounded-xl p-3">
          <div className="h-11 w-11 rounded-full bg-yellow-400" />
          <div className="flex flex-col">
            <span className="text-xs font-bold">COMMON</span>
            <span className="font-medium">Daniella Lim</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
