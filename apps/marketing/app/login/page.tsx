import Link from 'next/link';

export default function LoginPage() {
  const customerLoginUrl = process.env.NEXT_PUBLIC_CUSTOMER_LOGIN_URL ?? 'http://localhost:3001';

  return (
    <main className="loginPage">
      <nav className="nav wrap" aria-label="Main navigation"><Link className="wordmark" href="/"><span className="mark">A</span> AptiVigil</Link><Link className="loginLink" href="/packages">Explore packages</Link></nav>
      <section className="loginCard">
        <span className="loginMark">E</span>
        <span className="eyebrow">CUSTOMER WORKSPACE</span>
        <h1>Welcome back.</h1>
        <p>Sign in to continue to your organization workspace. Central SSO will be connected through the platform identity stories.</p>
        <a className="button loginButton" href={customerLoginUrl}>Continue to customer portal <span>→</span></a>
        <small>New to the platform? <Link href="/packages">Explore packages</Link></small>
      </section>
      <footer className="footer wrap"><Link href="/">← Back to AptiVigil</Link><span>Secure sign-in is provided by the shared identity service.</span></footer>
    </main>
  );
}
