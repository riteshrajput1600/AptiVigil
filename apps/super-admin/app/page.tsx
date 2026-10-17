import { WorkspaceHome } from '@aptivigil/ui';

export default function Home() {
  return <WorkspaceHome role="Super Admin" initials="SU" items={[
    { label: "Platform overview", description: "Review cross-organization service health." },
    { label: "Organizations", description: "Administer organization lifecycle and configuration." },
    { label: "Governance and audit", description: "Review privileged actions and platform governance." },
    { label: "Feature flags", description: "Manage controlled feature availability." },
  ]} />;
}
