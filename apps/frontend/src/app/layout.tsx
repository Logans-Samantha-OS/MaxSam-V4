/**
 * Root Layout Component
 * 
 * This is the main layout wrapper for the Next.js App Router.
 * All pages will be rendered inside this layout.
 */

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MaxSam V4',
  description: 'AI-Powered Real Estate Operations Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
