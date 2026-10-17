import { WorkspaceHome } from '@aptivigil/ui';

export default function Home() {
  return <WorkspaceHome role="Support Admin" initials="SA" items={[
    { label: "Support queue", description: "Work organization support requests within assigned scope." },
    { label: "Session diagnostics", description: "Inspect permitted session metadata without raw candidate answers." },
    { label: "Service status", description: "Review platform service availability." },
    { label: "Access requests", description: "Review and route time-limited access requests." },
  ]} />;
}
