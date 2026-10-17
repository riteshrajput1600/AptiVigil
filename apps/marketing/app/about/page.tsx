import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'About AptiVigil',
  description: 'Why AptiVigil is being built for organization-led exams, structured interviews, coding interviews and human-reviewed AI monitoring.',
};

export default function AboutPage() {
  return (
    <main className="contentPage">
      <SiteHeader current="about" />
      <section className="aboutHero wrap">
        <span className="eyebrow">ABOUT APTIVIGIL</span>
        <h1>Assessment should be <em>clear to everyone involved.</em></h1>
        <p>AptiVigil is an early-stage platform being built for schools and organizations to run exams, structured interviews and coding interviews, then review outcomes in one accountable process.</p>
      </section>
      <section className="aboutValues wrap">
        <article><span className="moduleNum">01 · CLARITY</span><h2>Make the process understandable.</h2><p>Give exam teams, reviewers and candidates clear expectations about how an assessment works and what happens next.</p></article>
        <article><span className="moduleNum">02 · OVERSIGHT</span><h2>Keep people responsible for decisions.</h2><p>Use monitoring signals as evidence to review in context, with documented decisions and a path to raise concerns.</p></article>
        <article><span className="moduleNum">03 · CONTROL</span><h2>Let organizations define their policy.</h2><p>Assessment requirements, access and monitoring should follow an institution’s documented needs and candidate notice.</p></article>
      </section>
      <section className="pageCta"><div className="wrap ctaInner"><div><span className="eyebrow">WORKING ON AN EXAM PROGRAM?</span><h2>Tell us what you need to assess.</h2><p>We’re speaking with institutions to understand their workflows and requirements.</p></div><Link className="button buttonLight" href="/contact">Get in touch <span>↗</span></Link></div></section>
      <SiteFooter />
    </main>
  );
}
