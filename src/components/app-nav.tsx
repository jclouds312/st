'use client';
import {
  BookText,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MediFlowLogo } from '@/components/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/courses', label: 'Courses', icon: BookText },
  { href: '/payments', label: 'Payments', icon: CreditCard },
];

export function AppNav() {
  const pathname = usePathname();

  return (
      <div className="flex h-full flex-col">
        <SidebarHeader className="border-b">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <MediFlowLogo className="h-6 w-6 text-primary" />
            <span className="text-lg font-headline">MediFlow</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="flex-1">
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    className="w-full justify-start"
                    isActive={pathname === link.href}
                    tooltip={link.label}
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    <span>{link.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t">
           <SidebarMenu>
             <SidebarMenuItem>
               <Link href="/settings" legacyBehavior passHref>
                 <SidebarMenuButton className="w-full justify-start"
                  isActive={pathname === '/settings'}
                  tooltip="Settings"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </Link>
             </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </div>
  );
}
