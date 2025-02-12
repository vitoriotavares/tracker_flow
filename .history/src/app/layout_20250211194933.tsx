import { Inter } from 'next/font/google';
import ThemeRegistry from './theme-registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Conversation Tracker Dashboard',
  description: 'Dashboard for AI conversation tracking system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}