import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppNav } from '@/components/app-nav';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/page-header';

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
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased', 'min-h-screen bg-background font-sans')}>
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
