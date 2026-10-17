import { DemoRequestForm } from './demo-request-form';
import type { Metadata } from 'next';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'Contact and request a demo | AptiVigil',
  description: 'Contact AptiVigil to discuss online assessment, coding exam and monitoring needs for your organization.',
};

export default function ContactPage() {
  const salesEmail = process.env.NEXT_PUBLIC_SALES_EMAIL ?? 'hello@aptivigil.com';

  return (
    <main className="contentPage">
      <SiteHeader current="contact" />
      <section className="contactHero wrap">
        <div className="contactIntro">
          <span className="eyebrow">CONTACT APTIVIGIL</span>
          <h1>Let’s talk about <em>your exams.</em></h1>
          <p>Schools and organizations can request a product walkthrough and discuss the assessment, coding and monitoring workflows they need.</p>
          <div className="contactNote"><span>01</span><div><b>Built around your organization</b><p>Our team will learn about your exam format, candidate volume and operational requirements.</p></div></div>
          <div className="contactNote"><span>02</span><div><b>No public account creation</b><p>AptiVigil works with institutions directly. Customer access is provisioned by authorized staff.</p></div></div>
        </div>
        <div className="contactFormCard">
          <span className="eyebrow">REQUEST A DEMO</span>
          <h2>Tell us a little about your team.</h2>
          <p>Submitting opens your email app with a draft addressed to AptiVigil. You can review it before sending.</p>
          <DemoRequestForm salesEmail={salesEmail} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
