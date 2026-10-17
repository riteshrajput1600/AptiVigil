import { WorkspaceHome } from '@aptivigil/ui';

export default function Home() {
  return <WorkspaceHome role="Student" initials="ST" items={[
    { label: "Exam lobby", description: "See upcoming exams and the instructions assigned to your account." },
    { label: "System readiness", description: "Review device, browser and accessibility checks before an attempt." },
    { label: "My attempts", description: "Find your active or completed assessment attempts." },
    { label: "Candidate support", description: "Find approved help and accommodation information." },
  ]} />;
}
