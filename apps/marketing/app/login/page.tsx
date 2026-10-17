import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Log in | AptiVigil',
  description: 'Log in to your AptiVigil workspace with your organization-issued ID and password.',
};

export default function LoginPage() {
  return (
    <main className="loginPage">
      <SiteHeader current="login" />
      <section className="loginCard">
        <span className="loginMark">A</span>
        <span className="eyebrow">APTIVIGIL ACCOUNT</span>
        <h1>Welcome back.</h1>
        <p>Use the ID and password provided by your organization. We’ll open the workspace assigned to your account.</p>
        <LoginForm />
        <small>Need an account or password help? <Link href="/contact">Contact your organization</Link></small>
      </section>
      <SiteFooter />
    </main>
  );
}
