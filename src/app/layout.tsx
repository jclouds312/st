import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/auth-context';
import { JotaiProvider } from '@/context/jotai-provider';
import { ThemeProvider } from '@/context/theme-provider';

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <JotaiProvider>
            <AuthProvider>
                {children}
                <Toaster />
            </AuthProvider>
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
