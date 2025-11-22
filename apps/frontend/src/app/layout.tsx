import type { Metadata } from 'next';

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
      <head>
        <style dangerouslySetInnerHTML={{__html: `
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            background-color: #0a0a0a;
            color: #f3f4f6;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #0a0a0a;
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #00d9ff 0%, #0080ff 100%);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #0080ff 0%, #a855f7 100%);
          }
          ::selection {
            background-color: rgba(0, 217, 255, 0.3);
            color: #ffffff;
          }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}