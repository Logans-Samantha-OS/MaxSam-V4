import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MaxSam V4',
  description: 'Operations Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-zinc-100">
        {children}
      </body>
    </html>
  );
}
