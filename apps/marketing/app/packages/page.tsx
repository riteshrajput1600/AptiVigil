import Link from 'next/link';

const packages = [
  { name: 'Assessments', label: 'CORE', description: 'Create and deliver structured online exams.', features: ['MCQ and essay questions', 'Scheduling and candidate assignments', 'Grading and results workflows'] },
  { name: 'Coding exams', label: 'TECHNICAL', description: 'Assess practical programming skills in a controlled workflow.', features: ['Coding question authoring', 'Isolated code execution roadmap', 'Submission and reviewer workflows'] },
  { name: 'Proctoring & review', label: 'INTEGRITY', description: 'Configure monitoring to fit the exam and review evidence responsibly.', features: ['Browser and device readiness signals', 'Optional camera, mic and screen capture', 'Human review and appeal workflows'] },
];

export default function PackagesPage() {
  return (
    <main className="packagesPage">
      <nav className="nav wrap" aria-label="Main navigation">
        <Link className="wordmark" href="/"><span className="mark">A</span> AptiVigil</Link>
        <div className="navLinks"><Link href="/#platform">Platform</Link><Link href="/packages" aria-current="page">Packages</Link></div>
        <div className="navActions"><Link className="loginLink" href="/login">Customer login</Link><Link className="button buttonSmall" href="/login">Customer login</Link></div>
      </nav>
      <section className="packagesHero wrap">
        <span className="eyebrow">PACKAGES</span>
        <h1>Build the exam experience <em>you need.</em></h1>
        <p>Explore platform capabilities. Plan names, prices, checkout and subscriptions will be published from the admin-managed catalog when billing is enabled.</p>
      </section>
      <section className="packageGrid wrap">
        {packages.map((pack) => (
          <article className="packageCard" key={pack.name}>
            <span className="packageLabel">{pack.label}</span>
            <h2>{pack.name}</h2>
            <p>{pack.description}</p>
            <ul>{pack.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
            <p className="packageLink">Discuss this package with our team</p>
          </article>
        ))}
      </section>
      <section className="packageFoot wrap"><p>Schools and organizations can contact our team to request a demo and discuss a tailored setup.</p></section>
      <footer className="footer wrap"><Link className="wordmark" href="/"><span className="mark">A</span> AptiVigil</Link><span>Packages and pricing are subject to published terms.</span><div><Link href="/">Home</Link><Link href="/login">Customer login</Link></div></footer>
    </main>
  );
}
