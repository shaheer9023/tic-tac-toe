import './globals.css';

export const metadata = {
  title: 'Tic Tac Toe',
  description: 'A simple Tic Tac Toe game built with Next.js, TypeScript, and Tailwind CSS',
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
