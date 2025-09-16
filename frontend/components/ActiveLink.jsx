'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ActiveLink({ href, children, className = '' }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`${className} ${active ? 'text-blue-700 font-semibold' : 'text-gray-800'} hover:text-blue-700`}
    >
      {children}
    </Link>
  );
}
