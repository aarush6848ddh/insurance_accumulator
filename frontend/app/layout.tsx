import type { Metadata } from 'next';
import './globals.css';
import Shell from './components/Shell';

export const metadata: Metadata = {
  title: 'Insurance Accumulator Demo | Summer Training Project',
  description: 'A comprehensive exploration of healthcare accumulator models developed during summer training. Learn how insurance companies manage member healthcare costs through sophisticated cost-sharing mechanisms.',
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
