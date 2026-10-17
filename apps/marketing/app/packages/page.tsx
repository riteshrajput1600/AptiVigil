import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'Packages | AptiVigil',
  description: 'Explore planned AptiVigil assessment, structured interview, coding interview and AI-assisted proctoring capabilities.',
};

const packages = [
  { name: 'Assessment delivery', label: 'ASSESSMENTS', description: 'Create and deliver institution-managed exams, structured interviews and candidate evaluations.', features: ['MCQ, written-response and question banks', 'Interview rubrics and candidate scorecards', 'Submissions, feedback and results workflow'] },
  { name: 'Coding assessments & interviews', label: 'TECHNICAL', description: 'Assess practical programming skills through timed exams or live interviewer-led coding sessions.', features: ['Coding challenge authoring and shared workspace', 'Isolated code runner is planned', 'Interviewer notes, tests and reviewer feedback'] },
  { name: 'AI proctoring & review', label: 'AI + HUMAN REVIEW', description: 'Planned multimodal integrity signals with human review for consequential decisions.', features: ['Candidate photo and face-match checks', 'Multiple-face, attention, audio and object signals', 'Tab/focus events, review timeline and reports'] },
];

export default function PackagesPage() {
  return (
    <main className="packagesPage">
      <SiteHeader current="packages" />
      <section className="packagesHero wrap">
        <span className="eyebrow">PACKAGES</span>
        <h1>Build the exam experience <em>you need.</em></h1>
        <p>Explore planned platform capability groups. AI-assisted proctoring, coding execution and platform services are under development; these cards describe intended scope, not features available to purchase today.</p>
      </section>
      <section className="packageGrid wrap">
        {packages.map((pack) => (
          <article className="packageCard" key={pack.name}>
            <span className="packageLabel">{pack.label}</span>
            <h2>{pack.name}</h2>
            <p>{pack.description}</p>
            <ul>{pack.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
            <Link className="packageLink" href="/contact">Discuss this package <span>↗</span></Link>
          </article>
        ))}
      </section>
      <section className="packageFoot wrap"><p>Packages, availability and pricing are confirmed with each organization. Request a demo to discuss your requirements.</p><Link className="button buttonSmall" href="/contact">Request a demo <span>↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
