
'use client';
import {
  BookText,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ClipboardUser,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MediFlowLogo } from '@/components/icons';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';

const links = [
  { href: '/dashboard', label: 'Panel de Control', icon: LayoutDashboard },
  { href: '/appointments', label: 'Citas', icon: CalendarDays },
  { href: '/patients', label: 'Pacientes', icon: ClipboardUser },
  { href: '/whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { href: '/courses', label: 'Capacitación', icon: BookText },
  { href: '/payments', label: 'Pagos', icon: CreditCard },
];

export function AppNav() {
  const pathname = usePathname();

  return (
      <div className="flex h-full flex-col">
        <SidebarHeader className="border-b">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <MediFlowLogo className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">MediFlow</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="flex-1">
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href}>
                  <SidebarMenuButton
                    className="w-full justify-start"
                    isActive={pathname.startsWith(link.href)}
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
                <Link href="/settings">
                  <SidebarMenuButton
                    className="w-full justify-start"
                    isActive={pathname === '/settings'}
                    tooltip="Configuración"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </SidebarMenuButton>
                </Link>
             </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </div>
  );
}
