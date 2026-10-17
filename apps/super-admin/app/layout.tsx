import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Super Admin | AptiVigil', description: 'Enterprise assessment and proctoring platform' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
