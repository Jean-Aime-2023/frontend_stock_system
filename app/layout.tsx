import type { Metadata } from 'next';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import { AuthProvider, ReactQueryProvider } from '@/providers';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Stock System',
  description: 'Stock System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased !scroll-smooth max-sm:text-[14px]`}
      >
        <ReactQueryProvider>
          <AuthProvider>
            <NextTopLoader color="#87A1FF" showSpinner={false} />
            {children}
          </AuthProvider>
        </ReactQueryProvider>
        <Toaster
          position="top-center"
        />
      </body>
    </html>
  );
}
