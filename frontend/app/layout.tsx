import type { Metadata } from 'next';
import './globals.css';
import Shell from './components/Shell';

export const metadata: Metadata = {
  title: 'Insurance Accumulator Demo | Optum Summer Training Project',
  description: 'A comprehensive exploration of healthcare accumulator models developed during summer training at Optum. Learn how insurance companies manage member healthcare costs through sophisticated cost-sharing mechanisms.',
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
