import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

export type WorkspaceItem = { label: string; description: string };

export function WorkspaceHome({
  role,
  initials,
  items,
}: {
  role: string;
  initials: string;
  items: WorkspaceItem[];
}) {
  return (
    <div className="av-workspace">
      <a className="av-skip" href="#av-main">Skip to main content</a>
      <aside className="av-rail" aria-label={`${role} navigation`}>
        <a className="av-brand" href="#av-main"><span>A</span> AptiVigil</a>
        <p className="av-role">{role}</p>
        <nav aria-label="Workspace">
          <ul>{items.map((item, index) => <li key={item.label}><a href={`#workspace-${index + 1}`}>{item.label}</a></li>)}</ul>
        </nav>
        <p className="av-rail-foot">LOCAL DEVELOPMENT</p>
      </aside>
      <main className="av-content" id="av-main">
        <header className="av-header">
          <div><span className="av-eyebrow">ASSESSMENT OPERATIONS</span><h1>{role} workspace</h1><p>Organization-led exams, interviews and review workflows.</p></div>
          <div className="av-avatar" aria-label={`${role} profile`}>{initials}</div>
        </header>
        <section className="av-status" aria-labelledby="av-status-title">
          <div><span className="av-eyebrow">DEVELOPMENT STATUS</span><h2 id="av-status-title">Workspace preview</h2><p>Navigation and shared layout are ready. Role workflows and live data are not connected yet.</p></div>
          <span className="av-status-pill">Local preview</span>
        </section>
        <div className="av-section-title"><div><span className="av-eyebrow">QUICK ACCESS</span><h2>Your workspace</h2></div><span className="av-muted">{items.length} areas</span></div>
        <div className="av-grid">{items.map((item, index) => <section className="av-card" id={`workspace-${index + 1}`} key={item.label} aria-labelledby={`workspace-title-${index}`}>
          <div className="av-card-top"><span className="av-icon">{String(index + 1).padStart(2, '0')}</span><span aria-hidden="true" className="av-arrow">↗</span></div>
          <h3 id={`workspace-title-${index}`}>{item.label}</h3><p>{item.description}</p>
          <StatusPanel title={`${item.label} is not connected yet`} description="This area will show records here when its workflow is implemented." />
        </section>)}</div>
        <footer className="av-footer">AptiVigil <span>•</span> Local development foundation</footer>
      </main>
    </div>
  );
}

export function StatusPanel({ title, description, kind = 'empty' }: { title: string; description: string; kind?: 'empty' | 'error' | 'loading' }) {
  return <div className={`av-message av-message-${kind}`} role={kind === 'error' ? 'alert' : 'status'} aria-live={kind === 'loading' ? 'polite' : undefined}><strong>{title}</strong><p>{description}</p></div>;
}

export function Field({ label, hint, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return <label className="av-field">{label}<input {...props} />{hint ? <small>{hint}</small> : null}</label>;
}

export function SelectField({ label, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: ReactNode }) {
  return <label className="av-field">{label}<select {...props}>{children}</select></label>;
}

export function TextareaField({ label, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return <label className="av-field">{label}<textarea {...props} /></label>;
}
