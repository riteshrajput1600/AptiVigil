import { WorkspaceHome } from '@aptivigil/ui';

export default function Home() {
  return <WorkspaceHome role="Exam Manager" initials="EM" items={[
    { label: "Exam dashboard", description: "Review exam preparation and delivery status." },
    { label: "Question bank", description: "Organize MCQ, written-response and coding questions." },
    { label: "Blueprints and exams", description: "Build assessments from approved question sets." },
    { label: "Schedules", description: "Coordinate exam windows, cohorts and candidate access." },
  ]} />;
}
