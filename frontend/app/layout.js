import './globals.css';
import SessionProvider from '../components/SessionProvider';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Poseidon Global Maritime University LMS',
  description: 'Learning Management System for Maritime Security Education',
};

export default function RootLayout({ children }) {
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
