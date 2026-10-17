import { WorkspaceHome } from '@aptivigil/ui';

export default function Home() {
  return <WorkspaceHome role="Proctor" initials="PR" items={[
    { label: "Live sessions", description: "Open assigned supervised exam sessions." },
    { label: "Risk queue", description: "Review monitoring signals that need human attention." },
    { label: "Alerts", description: "Track session alerts and operational notifications." },
    { label: "Proctor actions", description: "Record policy-based session actions with context." },
  ]} />;
}
