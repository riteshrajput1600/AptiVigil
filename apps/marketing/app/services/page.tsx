import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = {
  title: 'AI Proctoring & Exam Services | AptiVigil',
  description: 'Explore planned AptiVigil exams, structured and coding interviews, AI-assisted proctoring, candidate identity checks and human review workflows.',
};

const services = [
  { number: '01', title: 'Online and coding assessments', description: 'Run MCQ, written-response and coding exams in one organization-managed assessment workflow.', points: ['Question bank and exam authoring', 'Schedules, candidate assignments and readiness', 'Submissions, grading and reviewer workflows'] },
  { number: '02', title: 'Candidate identity verification', description: 'Plan a candidate photo check before entry and repeat face-to-reference comparisons during an exam.', points: ['Registration photo and live camera comparison', 'Identity mismatch and no-face signals', 'Manual verification path for unclear matches'] },
  { number: '03', title: 'AI visual proctoring signals', description: 'Use planned computer-vision checks to bring relevant visual events to an exam reviewer’s attention.', points: ['No face or multiple faces in the frame', 'Sustained looking-away or head-pose patterns', 'Phone or prohibited-object presence signals'] },
  { number: '04', title: 'Audio and voice-activity signals', description: 'Offer a policy-controlled microphone check to flag possible background speech or multiple voice activity.', points: ['Microphone and audio readiness', 'Background voice activity and overlapping speech cues', 'Candidate notice, consent and a non-audio policy option'] },
  { number: '05', title: 'Browser and screen monitoring', description: 'Capture supported browser events and, where the exam policy permits, candidate-shared screen evidence.', points: ['Tab hidden, focus loss and fullscreen exit events', 'Permission-based screen sharing or capture', 'Clear limits: a website cannot list other running apps'] },
  { number: '06', title: 'Human review and exam analytics', description: 'Bring event context into a people-led review process with explainable, time-based reporting.', points: ['Candidate session timeline and review queue', 'Reviewer notes, rationale and audit history', 'Exam-level trends and candidate-level reports'] },
  { number: '07', title: 'Structured, live and coding interviews', description: 'Run organization-led interview stages with reusable rubrics, live sessions and practical coding tasks.', points: ['Candidate scheduling and interviewer/panel roles', 'Collaborative coding interview workspace', 'Rubric-based scorecards and feedback reports'] },
];

export default function ServicesPage() {
  return (
    <main className="contentPage">
      <SiteHeader current="services" />
      <section className="pageHero wrap">
        <span className="eyebrow">AI-ASSISTED EXAM SERVICES</span>
        <h1>AI-powered assessment. <em>One platform for every interview.</em></h1>
        <p>Plan MCQ and written exams, structured interviews, live/video sessions and coding interviews alongside identity checks, monitoring and human-reviewed evidence.</p>
        <Link className="button" href="/contact">Discuss your requirements <span>↗</span></Link>
      </section>
      <section className="servicesGrid wrap">
        {services.map((service) => (
          <article className="serviceCard" key={service.number}>
            <span className="moduleNum">{service.number}</span>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <ul>{service.points.map((point) => <li key={point}><span>✓</span>{point}</li>)}</ul>
          </article>
        ))}
      </section>
      <section className="noticeBand wrap">
        <div><span className="eyebrow">PLANNED PRODUCT SCOPE · NOT LIVE FEATURES YET</span><h2>AI flags are signals. People make the decisions.</h2><p>Face mismatch, extra-person, gaze, audio and object detections can be affected by lighting, disability, network quality or a false match. AptiVigil is being designed to show context for trained human review, never to treat an AI flag as proof of cheating. Browser monitoring can report events like tab visibility or focus loss; a normal website cannot list the other apps running on a device. Every requested camera, microphone or screen permission should be disclosed and tied to the exam policy.</p></div>
      </section>
      <section className="pageCta"><div className="wrap ctaInner"><div><span className="eyebrow">LET’S TALK</span><h2>Tell us what your exams need.</h2><p>Our team can walk through a demo and discuss an organization-specific setup.</p></div><Link className="button buttonLight" href="/contact">Contact AptiVigil <span>↗</span></Link></div></section>
      <SiteFooter />
    </main>
  );
}
