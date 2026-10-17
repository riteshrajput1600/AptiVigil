import { WorkspaceHome } from '@aptivigil/ui';

export default function Home() {
  return <WorkspaceHome role="Reviewer" initials="RE" items={[
    { label: "Assigned cases", description: "Open cases assigned for independent review." },
    { label: "Evidence timeline", description: "Review available evidence in chronological context." },
    { label: "Review decisions", description: "Record reasoned review outcomes." },
    { label: "Appeals", description: "Track appeals and their independent review." },
  ]} />;
}
