import { WorkspaceHome } from '@aptivigil/ui';

export default function Home() {
  return <WorkspaceHome role="Organization Admin" initials="OR" items={[
    { label: "Organization overview", description: "Review the organization workspace and configured assessment programs." },
    { label: "Users and candidates", description: "Manage institution-provisioned staff and candidate access." },
    { label: "Policies", description: "Review organization settings and assessment policy controls." },
    { label: "Reports and integrations", description: "Explore reporting and integration setup." },
  ]} />;
}
