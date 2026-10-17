import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'Security and privacy | AptiVigil',
  description: 'Learn about AptiVigil security goals, privacy principles and current platform readiness.',
};

const principles = [
  ['Organization boundaries', 'Data access is intended to be scoped by organization membership, role and assigned work.'],
  ['Purposeful monitoring', 'Exam owners define the policy; candidates should see what signals or media are requested and why.'],
  ['Human review', 'Automated signals provide context for review. They are not, on their own, a finding of misconduct.'],
  ['Limited collection', 'Collect only the information needed for the exam and define access, retention and deletion rules.'],
  ['Transparent limitations', 'A normal web page cannot enumerate running operating-system apps or prove which app caused a focus change.'],
];

export default function SecurityPage() {
  return (
    <main className="contentPage">
      <SiteHeader current="security" />
      <section className="pageHero wrap">
        <span className="eyebrow">SECURITY & PRIVACY</span>
        <h1>Clear controls. <em>Honest limits.</em></h1>
        <p>Exam integrity and candidate privacy need to be considered together. These are the principles AptiVigil is being designed around.</p>
      </section>
      <section className="securityGrid wrap">
        {principles.map(([title, text], index) => <article className="securityCard" key={title}><span className="moduleNum">{String(index + 1).padStart(2, '0')}</span><h2>{title}</h2><p>{text}</p></article>)}
      </section>
      <section className="readinessNote wrap">
        <div><span className="eyebrow">CURRENT READINESS</span><h2>A development foundation, not a production security certification.</h2><p>The current repository contains an early application scaffold. Authentication, authorization enforcement, retention controls, independent security review, compliance assessments and production infrastructure still need to be implemented and verified. AptiVigil does not claim a certification or production-ready security posture at this stage.</p><Link href="/contact">Ask about platform readiness <span>↗</span></Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}
