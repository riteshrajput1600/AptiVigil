-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ExamStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MCQ_SINGLE', 'MCQ_MULTI', 'ESSAY', 'CODE');

-- CreateEnum
CREATE TYPE "QuestionLifecycle" AS ENUM ('DRAFT', 'IN_REVIEW', 'APPROVED', 'PUBLISHED', 'RETIRED');

-- CreateEnum
CREATE TYPE "AttemptStatus" AS ENUM ('READY', 'IN_PROGRESS', 'SUBMITTED', 'EXPIRED', 'VOIDED');

-- CreateEnum
CREATE TYPE "CodingRunStatus" AS ENUM ('QUEUED', 'RUNNING', 'PASSED', 'FAILED', 'TIMED_OUT', 'RESOURCE_LIMIT', 'ERROR');

-- CreateEnum
CREATE TYPE "ReviewDecision" AS ENUM ('CONFIRMED', 'DISMISSED', 'INCONCLUSIVE', 'ESCALATED');

-- CreateEnum
CREATE TYPE "EvidenceStatus" AS ENUM ('PENDING', 'AVAILABLE', 'EXPIRED', 'DELETED');

-- CreateEnum
CREATE TYPE "ProctoringSeverity" AS ENUM ('INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "organizations" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_members" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organization_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "externalId" TEXT,
    "email" TEXT,
    "displayName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_banks" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "bankId" UUID NOT NULL,
    "status" "QuestionLifecycle" NOT NULL DEFAULT 'DRAFT',
    "currentVersion" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_versions" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "version" INTEGER NOT NULL,
    "type" "QuestionType" NOT NULL,
    "lifecycle" "QuestionLifecycle" NOT NULL DEFAULT 'DRAFT',
    "prompt" JSONB NOT NULL,
    "options" JSONB,
    "answerKey" JSONB,
    "gradingRubric" JSONB,
    "codeSpec" JSONB,
    "maxScore" DECIMAL(10,2) NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "difficulty" INTEGER,
    "skill" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exams" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "status" "ExamStatus" NOT NULL DEFAULT 'DRAFT',
    "currentVersion" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_versions" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "examId" UUID NOT NULL,
    "version" INTEGER NOT NULL,
    "lifecycle" "ExamStatus" NOT NULL DEFAULT 'DRAFT',
    "durationSeconds" INTEGER NOT NULL,
    "availableFrom" TIMESTAMP(3),
    "availableUntil" TIMESTAMP(3),
    "policy" JSONB NOT NULL,
    "settings" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "exam_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_sections" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "examVersionId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "instructions" TEXT,
    "sequence" INTEGER NOT NULL,
    "timeLimitSeconds" INTEGER,
    "blueprint" JSONB,

    CONSTRAINT "exam_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_version_items" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "sectionId" UUID NOT NULL,
    "questionVersionId" UUID NOT NULL,
    "sequence" INTEGER NOT NULL,
    "points" DECIMAL(10,2) NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "exam_version_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_assignments" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "candidateId" UUID NOT NULL,
    "examId" UUID NOT NULL,
    "examVersionId" UUID NOT NULL,
    "scheduledAt" TIMESTAMP(3),
    "windowClosesAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidate_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attempts" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "assignmentId" UUID NOT NULL,
    "examVersionId" UUID NOT NULL,
    "status" "AttemptStatus" NOT NULL DEFAULT 'READY',
    "startedAt" TIMESTAMP(3),
    "submittedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attempt_answers" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "attemptId" UUID NOT NULL,
    "examVersionItemId" UUID NOT NULL,
    "response" JSONB NOT NULL,
    "revision" INTEGER NOT NULL DEFAULT 1,
    "idempotencyKey" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gradedAt" TIMESTAMP(3),
    "pointsAwarded" DECIMAL(10,2),
    "graderId" TEXT,

    CONSTRAINT "attempt_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coding_runs" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "attemptAnswerId" UUID NOT NULL,
    "submissionNumber" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "runtimeVersion" TEXT NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "status" "CodingRunStatus" NOT NULL DEFAULT 'QUEUED',
    "result" JSONB,
    "queueJobId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "coding_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proctoring_sessions" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "attemptId" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "proctoring_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proctoring_events" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "eventId" TEXT NOT NULL,
    "attemptId" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "clientTimestamp" TIMESTAMP(3),
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sequence" INTEGER NOT NULL,
    "confidence" DOUBLE PRECISION,
    "severity" "ProctoringSeverity" NOT NULL,
    "source" TEXT NOT NULL,
    "modelVersion" TEXT,
    "ruleVersion" TEXT,
    "metadata" JSONB,
    "evidenceRef" TEXT,

    CONSTRAINT "proctoring_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidence" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "attemptId" UUID NOT NULL,
    "objectKey" TEXT NOT NULL,
    "checksum" TEXT,
    "contentType" TEXT NOT NULL,
    "status" "EvidenceStatus" NOT NULL DEFAULT 'PENDING',
    "retentionUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_cases" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "attemptId" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "assignedReviewerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_decisions" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "caseId" UUID NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "decision" "ReviewDecision" NOT NULL,
    "reason" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_decisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "result_versions" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "attemptId" UUID NOT NULL,
    "version" INTEGER NOT NULL,
    "totalScore" DECIMAL(10,2) NOT NULL,
    "maximumScore" DECIMAL(10,2) NOT NULL,
    "breakdown" JSONB NOT NULL,
    "releasedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "result_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "organizationId" UUID,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT,
    "reason" TEXT,
    "metadata" JSONB,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "organization_members_organizationId_role_idx" ON "organization_members"("organizationId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "organization_members_organizationId_userId_key" ON "organization_members"("organizationId", "userId");

-- CreateIndex
CREATE INDEX "candidates_organizationId_email_idx" ON "candidates"("organizationId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_organizationId_id_key" ON "candidates"("organizationId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_organizationId_externalId_key" ON "candidates"("organizationId", "externalId");

-- CreateIndex
CREATE INDEX "question_banks_organizationId_name_idx" ON "question_banks"("organizationId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "question_banks_organizationId_id_key" ON "question_banks"("organizationId", "id");

-- CreateIndex
CREATE INDEX "questions_organizationId_bankId_status_idx" ON "questions"("organizationId", "bankId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "questions_organizationId_id_key" ON "questions"("organizationId", "id");

-- CreateIndex
CREATE INDEX "question_versions_organizationId_type_lifecycle_idx" ON "question_versions"("organizationId", "type", "lifecycle");

-- CreateIndex
CREATE UNIQUE INDEX "question_versions_organizationId_id_key" ON "question_versions"("organizationId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "question_versions_questionId_version_key" ON "question_versions"("questionId", "version");

-- CreateIndex
CREATE INDEX "exams_organizationId_status_idx" ON "exams"("organizationId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "exams_organizationId_id_key" ON "exams"("organizationId", "id");

-- CreateIndex
CREATE INDEX "exam_versions_organizationId_lifecycle_idx" ON "exam_versions"("organizationId", "lifecycle");

-- CreateIndex
CREATE UNIQUE INDEX "exam_versions_organizationId_id_key" ON "exam_versions"("organizationId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "exam_versions_organizationId_examId_id_key" ON "exam_versions"("organizationId", "examId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "exam_versions_examId_version_key" ON "exam_versions"("examId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "exam_sections_organizationId_id_key" ON "exam_sections"("organizationId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "exam_sections_examVersionId_sequence_key" ON "exam_sections"("examVersionId", "sequence");

-- CreateIndex
CREATE INDEX "exam_version_items_organizationId_questionVersionId_idx" ON "exam_version_items"("organizationId", "questionVersionId");

-- CreateIndex
CREATE UNIQUE INDEX "exam_version_items_organizationId_id_key" ON "exam_version_items"("organizationId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "exam_version_items_sectionId_sequence_key" ON "exam_version_items"("sectionId", "sequence");

-- CreateIndex
CREATE INDEX "candidate_assignments_organizationId_examId_scheduledAt_idx" ON "candidate_assignments"("organizationId", "examId", "scheduledAt");

-- CreateIndex
CREATE INDEX "candidate_assignments_organizationId_candidateId_idx" ON "candidate_assignments"("organizationId", "candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_assignments_organizationId_id_key" ON "candidate_assignments"("organizationId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_assignments_organizationId_id_examVersionId_key" ON "candidate_assignments"("organizationId", "id", "examVersionId");

-- CreateIndex
CREATE INDEX "attempts_organizationId_status_expiresAt_idx" ON "attempts"("organizationId", "status", "expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "attempts_organizationId_id_key" ON "attempts"("organizationId", "id");

-- CreateIndex
CREATE INDEX "attempt_answers_organizationId_attemptId_savedAt_idx" ON "attempt_answers"("organizationId", "attemptId", "savedAt");

-- CreateIndex
CREATE UNIQUE INDEX "attempt_answers_attemptId_examVersionItemId_key" ON "attempt_answers"("attemptId", "examVersionItemId");

-- CreateIndex
CREATE UNIQUE INDEX "attempt_answers_attemptId_idempotencyKey_key" ON "attempt_answers"("attemptId", "idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "attempt_answers_organizationId_id_key" ON "attempt_answers"("organizationId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "coding_runs_queueJobId_key" ON "coding_runs"("queueJobId");

-- CreateIndex
CREATE INDEX "coding_runs_organizationId_status_createdAt_idx" ON "coding_runs"("organizationId", "status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "coding_runs_attemptAnswerId_submissionNumber_key" ON "coding_runs"("attemptAnswerId", "submissionNumber");

-- CreateIndex
CREATE INDEX "proctoring_sessions_organizationId_attemptId_status_idx" ON "proctoring_sessions"("organizationId", "attemptId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "proctoring_sessions_organizationId_id_key" ON "proctoring_sessions"("organizationId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "proctoring_sessions_organizationId_id_attemptId_key" ON "proctoring_sessions"("organizationId", "id", "attemptId");

-- CreateIndex
CREATE INDEX "proctoring_events_organizationId_attemptId_occurredAt_idx" ON "proctoring_events"("organizationId", "attemptId", "occurredAt");

-- CreateIndex
CREATE UNIQUE INDEX "proctoring_events_organizationId_eventId_key" ON "proctoring_events"("organizationId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "proctoring_events_sessionId_sequence_key" ON "proctoring_events"("sessionId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "evidence_objectKey_key" ON "evidence"("objectKey");

-- CreateIndex
CREATE INDEX "evidence_organizationId_retentionUntil_idx" ON "evidence"("organizationId", "retentionUntil");

-- CreateIndex
CREATE UNIQUE INDEX "evidence_organizationId_id_key" ON "evidence"("organizationId", "id");

-- CreateIndex
CREATE INDEX "review_cases_organizationId_status_createdAt_idx" ON "review_cases"("organizationId", "status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "review_cases_organizationId_id_key" ON "review_cases"("organizationId", "id");

-- CreateIndex
CREATE INDEX "review_decisions_organizationId_caseId_createdAt_idx" ON "review_decisions"("organizationId", "caseId", "createdAt");

-- CreateIndex
CREATE INDEX "result_versions_organizationId_attemptId_idx" ON "result_versions"("organizationId", "attemptId");

-- CreateIndex
CREATE UNIQUE INDEX "result_versions_attemptId_version_key" ON "result_versions"("attemptId", "version");

-- CreateIndex
CREATE INDEX "audit_logs_organizationId_occurredAt_idx" ON "audit_logs"("organizationId", "occurredAt");

-- AddForeignKey
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_banks" ADD CONSTRAINT "question_banks_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_organizationId_bankId_fkey" FOREIGN KEY ("organizationId", "bankId") REFERENCES "question_banks"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_versions" ADD CONSTRAINT "question_versions_organizationId_questionId_fkey" FOREIGN KEY ("organizationId", "questionId") REFERENCES "questions"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_versions" ADD CONSTRAINT "exam_versions_organizationId_examId_fkey" FOREIGN KEY ("organizationId", "examId") REFERENCES "exams"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_sections" ADD CONSTRAINT "exam_sections_organizationId_examVersionId_fkey" FOREIGN KEY ("organizationId", "examVersionId") REFERENCES "exam_versions"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_version_items" ADD CONSTRAINT "exam_version_items_organizationId_sectionId_fkey" FOREIGN KEY ("organizationId", "sectionId") REFERENCES "exam_sections"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_version_items" ADD CONSTRAINT "exam_version_items_organizationId_questionVersionId_fkey" FOREIGN KEY ("organizationId", "questionVersionId") REFERENCES "question_versions"("organizationId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_assignments" ADD CONSTRAINT "candidate_assignments_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_assignments" ADD CONSTRAINT "candidate_assignments_organizationId_candidateId_fkey" FOREIGN KEY ("organizationId", "candidateId") REFERENCES "candidates"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_assignments" ADD CONSTRAINT "candidate_assignments_organizationId_examId_fkey" FOREIGN KEY ("organizationId", "examId") REFERENCES "exams"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_assignments" ADD CONSTRAINT "candidate_assignments_organizationId_examId_examVersionId_fkey" FOREIGN KEY ("organizationId", "examId", "examVersionId") REFERENCES "exam_versions"("organizationId", "examId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_organizationId_assignmentId_examVersionId_fkey" FOREIGN KEY ("organizationId", "assignmentId", "examVersionId") REFERENCES "candidate_assignments"("organizationId", "id", "examVersionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_organizationId_examVersionId_fkey" FOREIGN KEY ("organizationId", "examVersionId") REFERENCES "exam_versions"("organizationId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempt_answers" ADD CONSTRAINT "attempt_answers_organizationId_attemptId_fkey" FOREIGN KEY ("organizationId", "attemptId") REFERENCES "attempts"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempt_answers" ADD CONSTRAINT "attempt_answers_organizationId_examVersionItemId_fkey" FOREIGN KEY ("organizationId", "examVersionItemId") REFERENCES "exam_version_items"("organizationId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coding_runs" ADD CONSTRAINT "coding_runs_organizationId_attemptAnswerId_fkey" FOREIGN KEY ("organizationId", "attemptAnswerId") REFERENCES "attempt_answers"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proctoring_sessions" ADD CONSTRAINT "proctoring_sessions_organizationId_attemptId_fkey" FOREIGN KEY ("organizationId", "attemptId") REFERENCES "attempts"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proctoring_events" ADD CONSTRAINT "proctoring_events_organizationId_attemptId_fkey" FOREIGN KEY ("organizationId", "attemptId") REFERENCES "attempts"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proctoring_events" ADD CONSTRAINT "proctoring_events_organizationId_sessionId_attemptId_fkey" FOREIGN KEY ("organizationId", "sessionId", "attemptId") REFERENCES "proctoring_sessions"("organizationId", "id", "attemptId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_organizationId_attemptId_fkey" FOREIGN KEY ("organizationId", "attemptId") REFERENCES "attempts"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_cases" ADD CONSTRAINT "review_cases_organizationId_attemptId_fkey" FOREIGN KEY ("organizationId", "attemptId") REFERENCES "attempts"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_decisions" ADD CONSTRAINT "review_decisions_organizationId_caseId_fkey" FOREIGN KEY ("organizationId", "caseId") REFERENCES "review_cases"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_versions" ADD CONSTRAINT "result_versions_organizationId_attemptId_fkey" FOREIGN KEY ("organizationId", "attemptId") REFERENCES "attempts"("organizationId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

