import './globals.css'

export const metadata = {
  title: 'Poseidon Global Maritime University LMS',
  description: 'Maritime security courses and training platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}