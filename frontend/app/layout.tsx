import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import SessionProvider from '../components/SessionProvider';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Poseidon Global Maritime University LMS',
  description: 'Learning Management System for Maritime Security Education',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
