import type { Metadata } from 'next';
import './globals.css';
import Shell from './components/Shell';

export const metadata: Metadata = {
  title: 'Insurance Benefits Portal',
  description: 'View plan benefits by member ID and coverage dates',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
