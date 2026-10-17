import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'Assessment solutions | AptiVigil',
  description: 'Explore planned AI-assisted exam and proctoring workflows for schools, universities, certification programs and exam providers.',
};

const audiences = [
  { title: 'Schools and school groups', label: 'SCHOOL ASSESSMENTS', text: 'Coordinate term exams, entrance tests and internal assessments across classes, campuses or departments.', items: ['MCQ and written-response exams', 'Candidate photo check and session readiness', 'Policy-based signals for staff review'] },
  { title: 'Universities and colleges', label: 'HIGHER EDUCATION', text: 'Support semester exams with configurable monitoring policies and a documented academic review process.', items: ['Question bank and exam versions', 'Planned face, audio and browser signals', 'Human review for flagged sessions'] },
  { title: 'Certification and training', label: 'PROFESSIONAL PROGRAMS', text: 'Plan knowledge checks, coding assessments and credentialing exams for learners and professionals.', items: ['Knowledge and coding question formats', 'Candidate identity re-check workflow', 'Reviewable evidence and grading trail'] },
  { title: 'Assessment providers', label: 'EXAM OPERATORS', text: 'Give exam operations teams one view of candidate readiness, policy events and post-exam review.', items: ['Role-specific organization workspaces', 'Candidate event timelines and reports', 'Integration needs scoped with the team'] },
  { title: 'Hiring and talent teams', label: 'INTERVIEWS & HIRING', text: 'Coordinate structured interviews, coding rounds and consistent candidate evaluation across hiring panels.', items: ['Stage-based interview scheduling', 'Shared coding interview workspace', 'Rubric scorecards and interviewer feedback'] },
];

export default function SolutionsPage() {
  return (
    <main className="contentPage">
      <SiteHeader current="solutions" />
      <section className="pageHero wrap">
        <span className="eyebrow">SOLUTIONS</span>
        <h1>One assessment workflow, shaped for <em>your program.</em></h1>
        <p>From academic exams to hiring rounds, AptiVigil is being designed to bring assessments, structured and coding interviews, candidate identity checks, AI-assisted monitoring and human review into an organization-controlled process.</p>
        <Link className="button" href="/contact">Talk through your use case <span>↗</span></Link>
      </section>
      <section className="noticeBand wrap"><div><span className="eyebrow">PLANNED CAPABILITIES</span><h2>Configure monitoring to match exam stakes and policy.</h2><p>Organizations will be able to define the level of identity verification, browser events, camera or microphone checks, evidence retention and reviewer involvement appropriate to their exam. These capabilities are under development and will require candidate notice, permission handling and technical validation before use.</p></div></section>
      <section className="audienceGrid wrap">
        {audiences.map((audience) => (
          <article className="audienceCard" key={audience.label}>
            <span className="eyebrow">{audience.label}</span>
            <h2>{audience.title}</h2>
            <p>{audience.text}</p>
            <ul>{audience.items.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
          </article>
        ))}
      </section>
      <section className="pageCta"><div className="wrap ctaInner"><div><span className="eyebrow">START WITH YOUR EXAM</span><h2>Bring your requirements to a demo.</h2><p>We’ll discuss your formats, candidate workflow and monitoring policy.</p></div><Link className="button buttonLight" href="/contact">Request a demo <span>↗</span></Link></div></section>
      <SiteFooter />
    </main>
  );
}
