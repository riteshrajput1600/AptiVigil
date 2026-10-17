export const APP_ROLES = [
  'student',
  'organization-admin',
  'exam-manager',
  'proctor',
  'reviewer',
  'support-admin',
  'super-admin',
] as const;

export type AppRole = (typeof APP_ROLES)[number];

export type ExamStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type QuestionType = 'MCQ_SINGLE' | 'MCQ_MULTI' | 'ESSAY' | 'CODE';
export type QuestionLifecycle =
  | 'DRAFT'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'RETIRED';
export type AttemptStatus =
  | 'READY'
  | 'IN_PROGRESS'
  | 'SUBMITTED'
  | 'EXPIRED'
  | 'VOIDED';

export interface CandidateQuestion {
  examVersionItemId: string;
  questionVersionId: string;
  type: QuestionType;
  prompt: unknown;
  options?: Array<{ id: string; text: string }>;
  maxScore: number;
  /** Deliberately excludes answer keys and hidden coding tests. */
}

export type CandidateAnswer =
  | { type: 'MCQ_SINGLE'; optionId: string }
  | { type: 'MCQ_MULTI'; optionIds: string[] }
  | { type: 'ESSAY'; text: string }
  | { type: 'CODE'; language: string; sourceCode: string };

export interface SaveAnswerRequest {
  answer: CandidateAnswer;
  idempotencyKey: string;
}

export interface CodeExecutionRequest {
  attemptId: string;
  examVersionItemId: string;
  language: string;
  sourceCode: string;
  idempotencyKey: string;
}

export type ProctoringEventType =
  | 'FACE_ABSENT'
  | 'MULTIPLE_FACES'
  | 'CAMERA_INTERRUPTED'
  | 'TAB_HIDDEN'
  | 'FULLSCREEN_EXIT'
  | 'NETWORK_INTERRUPTED';

export interface ProctoringEvent {
  eventId: string;
  attemptId: string;
  sessionId: string;
  type: ProctoringEventType;
  occurredAt: string;
  clientTimestamp?: string;
  sequence: number;
  confidence?: number;
  severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  source: 'BROWSER' | 'MODEL' | 'SERVER' | 'HUMAN';
  modelVersion?: string;
  ruleVersion?: string;
  metadata?: Record<string, unknown>;
  evidenceRef?: string;
}
