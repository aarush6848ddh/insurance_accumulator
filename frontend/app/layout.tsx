import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Shell from './components/Shell';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Insurance Accumulator Demo | Summer Training Project',
  description: 'A comprehensive exploration of healthcare accumulator models developed during summer training. Learn how insurance companies manage member healthcare costs through sophisticated cost-sharing mechanisms.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
