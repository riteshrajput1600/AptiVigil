import Link from 'next/link';

const modules = [
  {
    number: '01',
    title: 'Assessment authoring',
    text: 'Build exams with multiple-choice, essay and coding questions in one workflow.',
  },
  {
    number: '02',
    title: 'Exam delivery',
    text: 'Schedule candidates, deliver accessible exams and track saved work and readiness.',
  },
  {
    number: '03',
    title: 'Proctoring and review',
    text: 'Use policy-based browser signals, optional media checks and human review workflows.',
  },
];

export default function MarketingHome() {
  return (
    <main>
      <nav className="nav wrap" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="AptiVigil home">
          <span className="mark">A</span> AptiVigil
        </Link>
        <div className="navLinks">
          <a href="#platform">Platform</a>
          <Link href="/packages">Packages</Link>
          <a href="#about">About</a>
        </div>
        <div className="navActions">
          <Link className="loginLink" href="/login">Log in</Link>
          <Link className="button buttonSmall" href="/packages">Explore packages</Link>
        </div>
      </nav>

      <section className="hero wrap">
        <div className="heroCopy">
          <span className="eyebrow"><span className="eyebrowDot" /> ASSESSMENT, BUILT FOR TRUST</span>
          <h1>Better exams begin with <em>better systems.</em></h1>
          <p className="heroText">
            Create, deliver and review online assessments from one platform—with the controls and
            human oversight serious exams need.
          </p>
          <div className="heroActions">
            <Link className="button" href="/packages">Explore the platform <span>↗</span></Link>
            <Link className="textButton" href="/login">Customer login <span>→</span></Link>
          </div>
          <p className="heroNote">MCQ · Essay · Coding · Proctoring · Review</p>
        </div>
        <div className="heroVisual" aria-label="Illustration of an online exam dashboard" role="img">
          <div className="visualGlow" />
          <div className="dashCard">
            <div className="dashTop"><span className="dashBrand"><i /> EXAM OPERATIONS</span><span className="live">DEMO VIEW</span></div>
            <div className="dashTitle">Exam readiness</div>
            <div className="dashSub">Biology assessment · Cohort A</div>
            <div className="metricRow">
              <div className="metric"><strong>128</strong><span>Assigned</span></div>
              <div className="metric"><strong>96</strong><span>Ready</span></div>
              <div className="metric"><strong>08</strong><span>In progress</span></div>
            </div>
            <div className="progressLabel"><span>Session readiness</span><b>75%</b></div>
            <div className="progress"><i /></div>
            <div className="candidateRow"><span className="candidateAvatar">AR</span><div><b>Candidate session</b><small>Camera and microphone ready</small></div><span className="check">✓</span></div>
            <div className="candidateRow"><span className="candidateAvatar alt">MK</span><div><b>Candidate session</b><small>Identity check needs review</small></div><span className="review">Review</span></div>
          </div>
          <div className="floatingTag"><span>✓</span> Human-reviewed decisions</div>
        </div>
      </section>

      <section className="trustStrip">
        <div className="wrap trustInner"><span>ONE WORKSPACE FOR</span><b>ASSESSMENTS</b><i /> <b>CODING EXAMS</b><i /> <b>PROCTORING</b><i /> <b>REVIEW</b></div>
      </section>

      <section className="platform wrap" id="platform">
        <div className="sectionIntro">
          <div><span className="eyebrow">THE PLATFORM</span><h2>Everything your exam needs.<br /><em>Connected by design.</em></h2></div>
          <p>Choose the capabilities that fit your exam process. Policies and permissions keep each organization in control.</p>
        </div>
        <div className="moduleGrid">
          {modules.map((module) => (
            <article className="moduleCard" key={module.number}>
              <span className="moduleNum">{module.number}</span>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
              <span className="moduleArrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="packageCta" id="about">
        <div className="wrap ctaInner">
          <div><span className="eyebrow">FIND YOUR FIT</span><h2>Explore packages for your team.</h2><p>Compare platform capabilities and choose a path that matches your assessment program.</p></div>
          <Link className="button buttonLight" href="/packages">View packages <span>↗</span></Link>
        </div>
      </section>

      <footer className="footer wrap">
        <Link className="wordmark" href="/"><span className="mark">A</span> AptiVigil</Link>
        <span>Assessments with clarity, control and care.</span>
        <div><Link href="/packages">Packages</Link><Link href="/login">Customer login</Link><Link href="/packages">Plans</Link></div>
      </footer>
    </main>
  );
}
