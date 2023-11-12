import './globals.css';

import { ThemeProvider } from '@algovrse/components/theme-provider';
import type { Metadata } from 'next';
import { Cousine } from 'next/font/google';

const baseFont = Cousine({
  style: ['italic', 'normal'],
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  description: 'Algovrse is a platform for sharing algorithm visualizations and learning algorithms.',
  title: 'AlgoVrse',
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={baseFont.className}>
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
