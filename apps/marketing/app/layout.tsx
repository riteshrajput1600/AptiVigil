import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AptiVigil | Assessments and Proctoring',
  description:
    'A single platform for online assessments, coding exams and responsible exam monitoring.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
