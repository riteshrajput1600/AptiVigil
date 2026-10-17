import type { AppRole } from '@aptivigil/types';
export type Permission = 'exam:read'|'exam:write'|'attempt:read:assigned'|'attempt:submit:own'|'case:review:assigned'|'support:diagnostics'|'platform:admin';
const grants:Record<AppRole,Permission[]>={student:['attempt:submit:own'], 'organization-admin':['exam:read','exam:write'], 'exam-manager':['exam:read','exam:write'],proctor:['attempt:read:assigned'],reviewer:['case:review:assigned'], 'support-admin':['support:diagnostics'], 'super-admin':['platform:admin']};
export const hasPermission=(role:AppRole,permission:Permission)=>grants[role]?.includes(permission)??false;
