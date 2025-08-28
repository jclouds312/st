import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppNav } from '@/components/app-nav';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/page-header';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'MediFlow',
  description: 'Optimizando la Atención al Paciente',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.variable}>
      <head>
      </head>
      <body className={cn('font-sans antialiased', 'min-h-screen bg-background')}>
        <SidebarProvider>
          <Sidebar>
            <AppNav />
          </Sidebar>
          <div className="flex flex-col md:ml-[var(--sidebar-width-icon)] lg:ml-[var(--sidebar-width)]">
            <PageHeader />
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
