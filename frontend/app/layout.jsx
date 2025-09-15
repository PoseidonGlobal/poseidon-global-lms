import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Poseidon Global LMS',
  description: 'Bringing maritime security courses alive.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
        <Footer />
      </body>
    </html>
  );
}