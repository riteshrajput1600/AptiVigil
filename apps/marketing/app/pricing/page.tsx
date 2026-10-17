import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'Pricing | AptiVigil',
  description: 'Discuss AptiVigil pricing for exams, structured interviews, coding interviews and AI-assisted proctoring with our team.',
};

const factors = [
  ['Assessment volume', 'Expected candidate and exam-session volume for your program.'],
  ['Assessment and interview needs', 'MCQ, written-response, structured interview and coding interview workflows.'],
  ['Monitoring and review', 'The browser signals, optional media checks and human review your policy requires.'],
  ['Implementation and support', 'Organization onboarding, integrations and operational support requirements.'],
];

const packageConcepts = [
  { name: 'Assessment', label: 'FOUNDATION', description: 'For organizations planning structured online assessments.', items: ['MCQ and written-response exams', 'Question and exam workflows', 'Scheduling and result workflows'] },
  { name: 'Integrity & review', label: 'MONITORING', description: 'For programs that need policy-based monitoring and people-led review.', items: ['Browser readiness and integrity signals', 'Optional media checks by exam policy', 'Review queue and documented decisions'] },
  { name: 'Institutional', label: 'ORGANIZATION', description: 'For multi-team exam and interview programs with broader operational needs.', items: ['Organization and role-scoped workspaces', 'Interview stages and candidate scorecards', 'Integration and implementation scoping'] },
];

export default function PricingPage() {
  return (
    <main className="contentPage">
      <SiteHeader current="pricing" />
      <section className="pageHero pricingHero wrap">
        <span className="eyebrow">PRICING</span>
        <h1>Pricing that starts with <em>your exam program.</em></h1>
        <p>AptiVigil pricing is not published yet. We’re validating the service and operating costs before quoting organizations. For now, request a demo and we’ll discuss a tailored proposal—there are no made-up public prices on this page.</p>
        <Link className="button" href="/contact">Request a pricing conversation <span>↗</span></Link>
      </section>
      <section className="planConcepts wrap">
        <div className="planConceptsIntro"><span className="eyebrow">PACKAGE CONCEPTS</span><h2>Choose a starting point for the conversation.</h2><p>These are planned scope groupings, not current purchase-ready plans. Final features, availability and price will be confirmed directly with each organization.</p></div>
        <div className="planConceptGrid">
          {packageConcepts.map((plan) => <article className="planConceptCard" key={plan.name}><span className="packageLabel">{plan.label}</span><h3>{plan.name}</h3><p>{plan.description}</p><ul>{plan.items.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul><Link href="/contact">Discuss this scope <span>↗</span></Link></article>)}
        </div>
      </section>
      <section className="pricingPanel wrap">
        <div className="pricingPanelHead"><span className="eyebrow">A CLEAR QUOTE, BUILT AROUND SCOPE</span><h2>What we’ll ask about</h2><p>These factors help us understand the work involved. They are not a price list or a promise that every capability is currently available.</p></div>
        <div className="pricingFactors">
          {factors.map(([title, text], index) => <article className="pricingFactor" key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </section>
      <section className="pricingFootnote wrap"><b>Need pricing for a current exam?</b><p>Contact us with your organization and exam requirements. We’ll confirm what is available and what would need a custom implementation.</p><Link href="/packages">Review platform packages <span>→</span></Link></section>
      <SiteFooter />
    </main>
  );
}
