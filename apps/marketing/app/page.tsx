import Link from 'next/link';
import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';

const capabilities = [
  { number: '01', title: 'Assessments and interviews', text: 'Bring MCQ, written-response, structured interview and coding interview workflows into one organization-led platform.' },
  { number: '02', title: 'Multimodal integrity signals', text: 'Bring browser activity together with planned face, multiple-person, attention, voice-activity and phone/object signals—configured for each exam policy.' },
  { number: '03', title: 'Human-reviewed evidence', text: 'Give exam teams a candidate timeline, signal context and review workflow so an AI flag supports an investigation instead of deciding misconduct.' },
];

export default function MarketingHome() {
  return (
    <main>
      <SiteHeader current="platform" />
      <section className="hero wrap">
        <div className="heroCopy">
          <span className="eyebrow"><span className="eyebrowDot" /> AI-ASSISTED ASSESSMENTS & INTERVIEWS</span>
          <h1 className="heroTitle"><span className="block">AI-powered exams</span><span className="block">and <em>interviews.</em></span></h1>
          <p className="heroText">AptiVigil is being built for exams, structured interviews and coding interviews—with candidate identity checks, AI-assisted monitoring and human-reviewed evidence in one organization-led workflow.</p>
          <div className="heroActions">
            <Link className="button" href="/contact">Talk to our team <span>↗</span></Link>
            <Link className="textButton" href="/services">Explore the platform <span>→</span></Link>
          </div>
          <p className="heroNote">MCQ · Essay · Coding interviews · AI proctoring · Human review</p>
        </div>
        <div className="heroVisual" aria-label="Illustrative preview of an exam operations dashboard" role="img">
          <div className="visualGlow" />
          <div className="dashCard">
            <div className="dashTop"><span className="dashBrand"><i /> APTIVIGIL · EXAM OPERATIONS</span><span className="live">CONCEPT PREVIEW</span></div>
            <div className="dashTitle">Exam overview</div>
            <div className="dashSub">Biology assessment · Cohort A</div>
            <div className="metricRow">
              <div className="metric"><strong>128</strong><span>Assigned · sample</span></div>
              <div className="metric"><strong>96</strong><span>Ready · sample</span></div>
              <div className="metric"><strong>08</strong><span>In progress · sample</span></div>
            </div>
            <div className="progressLabel"><span>Illustrative preview data</span><b>Not live results</b></div>
            <div className="progress"><i /></div>
            <div className="candidateRow"><span className="candidateAvatar">01</span><div><b>Candidate experience</b><small>Clear instructions and exam access</small></div><span className="check">✓</span></div>
            <div className="candidateRow"><span className="candidateAvatar alt">02</span><div><b>Review queue</b><small>Signals are reviewed in context</small></div><span className="review">Human-led</span></div>
          </div>
          <div className="floatingTag"><span>✓</span> Decisions stay reviewable</div>
        </div>
      </section>

      <section className="trustStrip" aria-label="Platform areas">
        <div className="wrap trustInner"><span>ONE CONNECTED WORKFLOW</span><b>ASSESSMENTS</b><i /> <b>INTERVIEWS</b><i /> <b>CODING</b><i /> <b>MONITORING</b><i /> <b>REVIEW</b></div>
      </section>

      <section className="platform wrap" id="platform">
        <div className="sectionIntro">
          <div><span className="eyebrow">THE APTIVIGIL APPROACH</span><h2>From exam setup to final review.<br /><em>One clear process.</em></h2></div>
          <p>Configure MCQ and written-response exams, structured and coding interviews, identity checks, AI-assisted monitoring signals and review trails around your organization’s policy.</p>
        </div>
        <div className="moduleGrid">
          {capabilities.map((item) => (
            <article className="moduleCard" key={item.number}>
              <span className="moduleNum">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="moduleArrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="principlesSection">
        <div className="wrap principlesInner">
          <div><span className="eyebrow">A RESPONSIBLE FOUNDATION</span><h2>Monitoring should support a fair process.</h2></div>
          <div className="principleList">
            <p><span>01</span> Face, voice, attention and object detections are review signals; they do not prove misconduct on their own.</p>
            <p><span>02</span> Organizations define exam policies and communicate them to candidates.</p>
            <p><span>03</span> A standard website cannot see which other apps are running on a candidate’s device.</p>
          </div>
        </div>
      </section>

      <section className="packageCta">
        <div className="wrap ctaInner">
          <div><span className="eyebrow">FOR SCHOOLS AND ORGANIZATIONS</span><h2>Plan an exam program with our team.</h2><p>Tell us what you assess and what your team needs to oversee.</p></div>
          <Link className="button buttonLight" href="/contact">Request a demo <span>↗</span></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
