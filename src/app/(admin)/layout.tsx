// app/layout.tsx
import type { Metadata } from 'next';
import AppHeader from '@/layout/AppHeader';
import AllNavigator from '@/layout/AllNavigator';
import { ThemeProvider } from '@/context/ThemeContext';
import { SidebarProvider } from '@/context/SidebarContext';

export const metadata: Metadata = {
  title: 'IfBash',
  description: 'Modern HR Service Portal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen bg-gray-50 dark:bg-gray-950 antialiased overflow-hidden" suppressHydrationWarning>
        <ThemeProvider>
          <SidebarProvider>
            <div className="flex h-screen flex-col">
              <AppHeader />
              <div className="flex flex-1 overflow-hidden">
                <AllNavigator />
                <main className="flex-1 pt-4 lg:pt-6 px-4 lg:px-6 overflow-auto">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}