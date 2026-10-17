import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'Frequently asked questions | AptiVigil',
  description: 'Answers about AptiVigil access, exams, structured and coding interviews, AI monitoring and platform availability.',
};

const questions = [
  ['Can anyone create an AptiVigil account?', 'No. AptiVigil is intended for schools and organizations. An organization contacts the team, and authorized staff provision customer access. There is no public self-registration.'],
  ['How does login work?', 'Users will sign in with organization-issued credentials. After the identity service is implemented, the authenticated role will determine the appropriate workspace. The login screen exists, but credential verification is not live yet.'],
  ['How much does AptiVigil cost?', 'Public prices have not been set. Pricing needs to reflect exam volume, question types, monitoring and review requirements, integrations and support. Contact the team to discuss a quote.'],
  ['Which exam formats are planned?', 'The product scope includes multiple-choice, written-response and coding assessments. Secure code execution will remain unavailable until an isolated runner is implemented and reviewed.'],
  ['Will AptiVigil support interviews as well as exams?', 'Yes. The intended product scope includes structured interviews, live/video interviews and coding interviews, with interviewer roles, schedules, rubrics, scorecards and candidate feedback. These workflows are planned and are not available yet.'],
  ['What is planned for AI-assisted proctoring?', 'The planned scope includes a start-of-exam candidate photo check and repeat face-to-reference checks, signals for no face or multiple faces, sustained looking-away/head-pose patterns, possible phone/object presence, background voice activity, and browser events such as tab visibility or focus loss. Exact checks will be configurable by exam policy. These are planned capabilities, not live features today.'],
  ['Can AptiVigil recognize every voice or identify another app?', 'No. The planned audio checks are for possible voice activity or overlapping speech, not speaker identity. A normal website can report browser focus or visibility changes but cannot list the other apps running on the computer or prove which app caused an event.'],
  ['What happens if a candidate switches tabs?', 'The planned browser monitoring can log visibility or focus changes and show them in the session timeline. An organization can define whether to show a candidate warning or route the event for review. The event alone does not prove which app was opened or that misconduct occurred.'],
  ['Does an AI flag automatically decide that a candidate cheated?', 'No. A flag is a signal for a trained reviewer to assess in context. It should not be treated as proof or used as an automatic adverse decision.'],
  ['Is AptiVigil production-ready today?', 'No. The current software is an early development foundation. Authentication, security controls, monitoring services, operational procedures and independent review are still under development.'],
];

export default function FaqPage() {
  return (
    <main className="contentPage">
      <SiteHeader current="faq" />
      <section className="pageHero wrap"><span className="eyebrow">FAQ</span><h1>Questions, answered <em>plainly.</em></h1><p>What institutions and exam teams often want to know about AptiVigil.</p></section>
      <section className="faqList wrap">
        {questions.map(([question, answer]) => <details className="faqItem" key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
      </section>
      <section className="faqCta wrap"><div><h2>Still have a question?</h2><p>Tell us about your organization and exam program.</p></div><Link className="button" href="/contact">Contact AptiVigil <span>↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
