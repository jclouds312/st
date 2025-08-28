
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { SidebarProvider, Sidebar } from '@/components/ui/sidebar';
import { AppNav } from '@/components/app-nav';
import { PageHeader } from '@/components/page-header';
import { Skeleton } from '@/components/ui/skeleton';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
     return (
      <div className="flex min-h-screen w-full">
        <div className="hidden md:flex h-screen w-[16rem] flex-col gap-2 border-r p-2">
            <Skeleton className="h-14" />
            <div className="flex-1 space-y-2 p-2">
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
            </div>
        </div>
        <div className="flex-1 p-4">
             <Skeleton className="h-14" />
             <Skeleton className="mt-4 h-[calc(100vh-5rem)]" />
        </div>
      </div>
    );
  }

  return (
        <SidebarProvider>
          <Sidebar>
            <AppNav />
          </Sidebar>
          <div className="flex flex-col md:ml-[var(--sidebar-width-icon)] lg:ml-[var(--sidebar-width)]">
            <PageHeader />
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </SidebarProvider>
  );
}

