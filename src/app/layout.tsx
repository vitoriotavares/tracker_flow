import { Outfit } from 'next/font/google';
import Providers from '@/providers/Providers';

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

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
      <body className={outfit.className} suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}