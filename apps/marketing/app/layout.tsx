import type { Metadata } from 'next';
import './globals.css';
import '@aptivigil/ui/styles.css';

export const metadata: Metadata = {
  title: 'AptiVigil | AI-Assisted Exams and Proctoring',
  description:
    'AptiVigil is developing AI-assisted exams, structured and coding interviews, candidate identity checks, browser and media signals and human-reviewed reporting for institutions.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
