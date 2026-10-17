# API contract boundaries

All routes are versioned under /api/v1. Every route except health and identity callback routes requires a verified session. Tenant scope is resolved from authenticated membership and resource ownership; request bodies do not authorize tenant access. Resource IDs are checked together with tenant and assignment scope.

## Identity and organization

- GET /me: current identity, memberships and application permissions.
- GET /organizations/:organizationId: requires active membership and organization-scoped permission.
- Membership provisioning is a privileged audited operation; SSO and SCIM are integration modules, not portal-side shortcuts.

## Authoring

- GET|POST /question-banks
- GET|POST /question-banks/:bankId/questions
- POST /questions/:questionId/versions
- POST /question-versions/:versionId/submit-for-review
- POST /question-versions/:versionId/approve
- POST /exams, POST /exams/:examId/versions
- PUT /exam-versions/:versionId/sections/:sectionId/items
- POST /exam-versions/:versionId/validate, POST /exam-versions/:versionId/publish

Question types are single-select MCQ, multi-select MCQ, essay and code. Essay versions carry rubrics; code versions carry language/runtime policy and hidden test cases. Answer keys, rubrics not intended for candidates, and hidden tests are never part of candidate question DTOs. Published exam/question versions are immutable; edits create a new version.

## Assignment and attempt

- POST /exams/:examId/assignments: organization-scoped manager permission.
- GET /candidate/assignments: student sees own assignments only.
- POST /assignments/:assignmentId/attempts: verifies assignment, schedule, attempt limit and published version server-side.
- GET /attempts/:attemptId: candidate access is limited to own active attempt; proctor/reviewer access requires explicit assignment.
- PUT /attempts/:attemptId/answers/:examVersionItemId: validates answer against the snapshotted question type, uses an idempotency key, and records a server timestamp.
- POST /attempts/:attemptId/submit: server closes the attempt and snapshots answers; client time and score are ignored.

## Coding runs

- POST /attempts/:attemptId/code-runs: validates language and attempt state, stores the submission, then enqueues an idempotent job.
- GET /code-runs/:runId: returns only candidate-safe status/results.
- The API never executes code. A separate runner consumes a durable job, applies the versioned sandbox profile, and reports a bounded result. Hidden test inputs and expected output stay server-side.

## Proctoring and review

- POST /attempts/:attemptId/proctoring-events: validates session/attempt ownership, de-duplicates by tenant + event ID, and assigns server receipt time.
- POST /attempts/:attemptId/evidence-uploads: returns a short-lived grant for a private object; evidence bytes are not accepted into PostgreSQL.
- GET /review/cases, POST /review/cases/:caseId/decisions, POST /review/cases/:caseId/appeals: each requires assigned case scope and writes immutable audit/decision records.

These are target contracts, not all implemented routes. Before adding controllers, define DTO validation, permission metadata, audit requirements and error responses at the domain module boundary.
