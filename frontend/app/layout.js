import './globals.css';
import SessionProvider from '../components/SessionProvider';

export const metadata = {
  title: 'Poseidon Global Maritime University LMS',
  description: 'Learning Management System for Maritime Security Education',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
