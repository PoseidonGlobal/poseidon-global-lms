import './globals.css';

export const metadata = {
  title: 'Poseidon Global Maritime University LMS',
  description: 'Learning Management System for Maritime Security Education',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
