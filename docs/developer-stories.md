# AptiVigil — Solo-developer build plan

This is the assignable backlog for the complete platform in the supplied enterprise architecture. It is ordered for one developer working sequentially. Each story targets 2–3 focused development days and has a defined dependency and reviewable outcome.

## Scope and source notes

The source requires one monorepo, seven independent role portals, a public marketing/customer-acquisition app, a shared backend, tenant-isolated data, and separately deployable realtime, event-ingestion, worker, reporting, AI and code-runner services. Schools/organizations request a demo or contact the team; there is no public self-registration. Authorized staff provision the customer tenant and users, then send secure invitations. The public site is separate from the seven authenticated role portals. It also covers assessment authoring/delivery, evidence, human review, enterprise integrations, privacy, security, operations and production readiness. Product scope additionally includes structured interviews, live/video interviews and coding interviews for education, hiring, certification and other organization-led use cases; interview workflows are first-class alongside exams, not a separate product.

All question families are in scope: single/multi-select MCQ, essay and coding. Coding authoring and candidate UX are designed from the start; code execution must stay disabled until the isolated runner stories are complete and reviewed. The source release table places coding execution in R2, but the requested product scope includes it. This plan makes the secure runner a gate for the first complete exam release. Proctoring is tiered: browser integrity signals for standard web exams, explicit permission-based media capture where policy requires it, and a managed secure-browser client for exams that require OS-level app/process controls.

Interview workflows include interviewer/candidate scheduling, structured scorecards and rubrics, live session support, coding interview workspaces on the same isolated runner, feedback and candidate-level analytics. Optional recordings/transcripts and AI-assisted summaries or rubric-linked suggestions require explicit policy, notice, access and retention controls. AI can assist with evidence and workflow; it never autonomously makes hiring, admission, certification or misconduct decisions. See Phase 13 for the assignable interview stories.

The supplied filename says v14, while the document body identifies itself as Architecture v13. This backlog uses the full supplied content, including later additions and the final role/app corrections.

## How to use the backlog

- Take one story at a time in the order shown within each phase, after its dependencies are accepted.
- Estimates are for one developer, including implementation and the small amount of verification needed to accept that story. Vendor onboarding, customer decisions, security sign-off and external review add calendar time.
- Keep a story under three focused days. If discovery shows it is larger, split it before implementation.
- Do not start a portal-only feature before its API contract, permission and tenant scope are clear.
- A story is done when its acceptance condition is met, relevant operational/security notes exist, and CI/build checks for affected code pass.
- This sequence is not a promise that an enterprise platform takes only a few weeks. Do not skip production/security gates to meet a date.

Status: **Done** means the current repo already provides the stated outcome; **Next** is the first recommended ticket; **Todo** means not implemented. Existing portal shells do not count as completed role workflows.

## Phase 0 — Local development and engineering base

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|---|
| DEV-01 | Local Node, pnpm, Docker-compatible engine and setup command | 2d | — | **Done.** Node 22, pnpm, Colima/Docker CLI, Compose, Postgres and Redis run locally; pnpm setup:local applies migrations and seeds repeatably. | [x] |
| DEV-02 | Record architecture decisions and product boundaries | 2d | DEV-01 | **Done.** Seven ADRs record OIDC/Keycloak boundary, SQS/ElasticMQ, S3-compatible storage, initial coding languages, biometric vendor decision gate, AWS deployment target, and AI runtime/model policy. | [x] |
| DEV-03 | Workspace CI and affected-project builds | 2d | DEV-01 | **Done.** CI uses the frozen lockfile, generates Prisma Client, deploys migrations against a PostgreSQL service, then typechecks and builds every workspace so all affected projects are covered. | [x] |
| DEV-04 | Environment validation, structured logger and request IDs | 3d | DEV-01, DEV-02 | **Done.** API validates required PostgreSQL/Redis and port/CORS config before listen; requests receive server-generated `X-Request-ID`; structured request logs contain method/path/status/duration only. Shared worker config and correlation helpers are ready for future worker entrypoints; payloads and secrets are excluded. | [x] |
| DEV-05 | Shared design system and accessible app shell | 3d | DEV-03 | **Done.** Seven role portal shells and the public marketing app consume the shared accessible shell, navigation, fields and empty/error/loading components. Marketing remains a separate public app; portal authentication/authorization is a later IAM phase. | [x] |
| DEV-06 | Local object storage, queue and email profile | 3d | DEV-02, DEV-04 | **Done.** Compose starts SeaweedFS with an S3 API, ElasticMQ SQS-compatible queues/DLQs and Mailpit behind local settings; cloud credentials are not needed. SeaweedFS is selected in ADR-0003 in place of the original MinIO wording. | [x] |

## Phase 1 — Identity, tenants and authorization

This is the first security gate. Do not build domain endpoints that accept tenant IDs from browser input before it is in place.

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|
| IAM-01 | Canonical role and permission matrix | 2d | DEV-02 | Matrix covers Student, Organization Admin, Exam Manager, Proctor/Lead Proctor, Reviewer, restricted Support Admin and Super Admin; Developer, AI/ML Ops, SRE, Security/Auditor, Data/Analytics and restricted Database Operator remain separate engineering identities. Product roles never imply GitHub or cloud access. | [ ] |
| IAM-02 | Central OIDC login and session lifecycle | 3d | IAM-01, DEV-02 | One identity works across all seven authenticated role portals; the public marketing app hands off sign-in and does not keep credentials. Session creation, expiry, logout, revocation and callback errors are defined. No demo-password bypass. | [ ] |
| IAM-03 | Organization membership and role assignment | 3d | IAM-02 | Users may hold multiple scoped product roles; membership changes are authorized, tenant-scoped and audited. | [ ] |
| IAM-04 | Tenant context and database constraints | 3d | IAM-03 | API derives tenant scope from verified membership; tenant-owned relationships cannot connect rows from different organizations; cross-tenant access denies by default. | [ ] |
| IAM-05 | Backend RBAC/ABAC and resource ownership | 3d | IAM-04, IAM-01 | Protected controller/service checks role, tenant, resource owner and assignment scope; UI visibility is not authorization. | [ ] |
| IAM-06 | Audit event foundation and privileged actions | 3d | IAM-05, DEV-04 | Role, exam, policy, result and privileged changes create append-only correlated audit records; sensitive actions require a reason. | [ ] |
| IAM-07 | MFA, session/device management and step-up | 3d | IAM-02, IAM-06 | Privileged roles can use MFA/WebAuthn; users can revoke sessions; configured high-risk actions require step-up. | [ ] |
| IAM-08 | Break-glass elevation and restricted Support Admin | 3d | IAM-06, IAM-07 | Temporary elevation expires and records who, why, scope and time; routine support sees diagnostics without raw candidate evidence. | [ ] |

## Phase 2 — Question bank and exam authoring

All three question types are first-class and versioned. Answer keys, grading-only rubrics and hidden tests must never reach candidate browsers.

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|
| QST-01 | Question-bank ownership, lifecycle and metadata | 3d | IAM-05 | Tenant-scoped banks support draft/review/approved/published/retired lifecycle, tags, topic, skill, difficulty, objective and owner. | [ ] |
| QST-02 | Versioned single/multi-select MCQ | 3d | QST-01 | Single and multi-select questions have immutable versions, options and server-only keys; candidate DTO omits keys. | [ ] |
| QST-03 | Versioned essay question and rubric | 2d | QST-01 | Essay prompt, max score, rubric criteria and grading guidance are versioned; candidate view receives only allowed prompt/instructions. | [ ] |
| QST-04 | Versioned coding question and hidden-test model | 3d | QST-01, DEV-02 | Coding question stores allowed languages/runtime profile, limits, visible samples and private tests separately; hidden data is never candidate-readable. | [ ] |
| QST-05 | Rich content, attachments and secure preview | 3d | QST-02, QST-03, QST-04 | Content supports approved rich text/media; preview is permission-checked and logged; release policy controls when content is sent; answer material is protected. Print/copy restrictions are enforced only where the managed client can support them. | [ ] |
| QST-06 | Question review, approval and immutable versions | 3d | QST-02, QST-03, QST-04, IAM-06 | Author submits a version; reviewer approves/returns it; edits create a new version and preserve history. | [ ] |
| QST-07 | File-upload and structured-response question types | 3d | QST-01, DEV-06 | Versioned question supports constrained file/structured responses, type/size limits, scoring guidance and candidate-safe prompt. | [ ] |
| QST-08 | Question import/export and bulk authoring | 3d | QST-02, QST-03, QST-04, QST-07 | Validated schema import supports preview/errors and bulk draft creation; export is authorized, audited and excludes hidden answer/test data. | [ ] |
| QST-09 | Question bank authoring and review screens | 3d | QST-05, QST-06, QST-07, QST-08, DEV-05 | Exam Manager creates and edits all supported question types, reviews version/lifecycle state, previews candidate-safe content and submits changes through authorized APIs. | [ ] |
| EXM-01 | Exam draft, sections, timers and delivery settings | 3d | QST-06, QST-07, QST-08 | Manager creates ordered sections, global/section timers, marks, attempt limits, accommodations and policy settings. | [ ] |
| EXM-02 | Blueprint definition and publish validation | 3d | EXM-01 | Blueprint expresses skill/topic/difficulty/section coverage; validator reports missing coverage and invalid mark/time constraints. | [ ] |
| EXM-03 | Pools, randomization and exposure controls | 3d | EXM-02 | Versions can draw from pools, randomize questions/options and enforce exposure limits; generated forms are reproducible per attempt. | [ ] |
| EXM-04 | Snapshot policy and supported exam modes | 3d | EXM-01 | Versioned policy selects Standard, Automated, Live, Hybrid, Record & Review, Test Center or Hybrid Classroom mode and snapshots signals/actions/retention. | [ ] |
| EXM-05 | Preview, approval, publish and version correction | 3d | EXM-02, EXM-03, EXM-04, QST-06 | Manager previews the exact candidate form; publish freezes exam/question versions; correction creates a new version without changing existing attempts. | [ ] |
| EXM-06 | Exam-manager authoring screens | 3d | EXM-01, EXM-05, DEV-05 | Exam Manager builds, previews, validates, submits for approval and publishes through shared API; UI cannot bypass permissions. | [ ] |

## Phase 3 — Scheduling, assignment and candidate delivery

The server owns time, saved answers, eligibility and submission. Candidate timers are display aids only.

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|
| SCH-01 | Time-zone-aware schedule windows | 3d | EXM-05 | Schedules represent timezone, open/close window, blackout/reschedule policy and accommodations without ambiguous timestamps. | [ ] |
| SCH-02 | Candidate import and assignment | 3d | SCH-01, IAM-05 | Manager assigns candidates to a specific published version; CSV preview validates duplicates, tenant mismatch and row errors before commit. | [ ] |
| SCH-03 | Bulk reschedule, revoke, extend and export | 3d | SCH-02 | Bulk operations preview validated changes; each mutation is scoped, idempotent where needed and audited. | [ ] |
| CAN-01 | Candidate login, notice, consent and lobby | 3d | IAM-02, SCH-02 | Candidate sees own assigned exams and policy/recording notice; consent is recorded against the attempt policy. | [ ] |
| CAN-02 | Readiness center and diagnostics | 3d | CAN-01, EXM-04 | Candidate checks browser, camera, mic, screen-share, network and device capability and available CPU/memory signals; failures have accessible remediation and support linkage. | [ ] |
| CAN-03 | Policy-matched practice exam | 2d | CAN-02, EXM-05 | Practice exercises selected question/proctor controls without creating a scored production attempt or retaining unnecessary media. | [ ] |
| ATT-01 | Server-authoritative attempt creation | 3d | SCH-02, CAN-01, IAM-05 | Start verifies assignment, schedule, attempt limit and published version; snapshots policy, server start/expiry and exact question form. | [ ] |
| ATT-02 | Candidate MCQ runtime | 3d | ATT-01, QST-02 | Single/multi-select UI renders safe content, supports keyboard/screen readers and shows save/connection state. | [ ] |
| ATT-03 | Candidate essay runtime | 2d | ATT-01, QST-03 | Accessible essay editing is autosave-ready and bounded by policy; rubric/scoring guidance remain hidden. | [ ] |
| ATT-04 | Candidate coding editor and submission UX | 3d | ATT-01, QST-04 | Candidate selects an allowed language, edits code and submits/retries within policy; editor includes accessible section/question navigation, server-derived remaining time and save/connection state; hidden tests and runner internals stay server-side. | [ ] |
| ATT-05 | Idempotent autosave and answer history | 3d | ATT-02, ATT-03, ATT-04, IAM-05 | Writes validate pinned question type, carry idempotency/revision and get server time; duplicate requests do not duplicate answers. | [ ] |
| ATT-06 | Bounded offline buffer and reconnect reconciliation | 3d | ATT-05 | Temporary answer/event queue is encrypted and bounded; reconnect reconciles sequence/revision and confirms saved state. | [ ] |
| ATT-07 | Crash recovery, server timer and submit lock | 3d | ATT-06 | Resume follows policy; server reconstructs answers/time; final submit is idempotent and makes answers immutable. | [ ] |
| GRADE-01 | Objective scoring and result versions | 3d | ATT-07, QST-02 | MCQ scoring is server-side with partial/negative marking policy; result pins exam version; correction creates audited new version. | [ ] |
| GRADE-02 | Essay grading, rubric workflow and release | 3d | ATT-07, QST-03, IAM-05 | Authorized grader scores by rubric with feedback; optional second marking works; release is permission-controlled. | [ ] |

## Phase 4 — Secure code execution

Coding execution is a hard release dependency for coding exams. Never execute candidate source in the API, realtime process or general worker.

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|
| RUN-01 | Runner threat model and language policy | 2d | QST-04, DEV-02 | Document attacker model, supported languages (including SQL where safely supported)/versions, limits, isolation, result leakage policy and rollback/kill process. | [ ] |
| RUN-02 | Durable run queue and local/production adapters | 3d | RUN-01, DEV-06 | API persists idempotent requests; local SQS-compatible adapter and AWS SQS/DLQ adapter share a versioned job contract. | [ ] |
| RUN-03 | Disposable sandbox image and no-network execution | 3d | RUN-01 | Pinned minimal per-language images run without network using constrained/read-only filesystem, non-root identity and disposable context. | [ ] |
| RUN-04 | Quotas, timeout, kill and output bounds | 3d | RUN-03 | CPU/memory/process/time/output limits are enforced; timed-out or oversized jobs are killed and cleaned up. | [ ] |
| RUN-05 | Hidden-test execution and candidate-safe result | 3d | RUN-02, RUN-04, ATT-04 | Worker loads private tests, stores bounded result and returns only approved feedback; artifacts follow retention policy. | [ ] |
| RUN-06 | Coding score and execution failure behavior | 2d | RUN-05, GRADE-01 | Tests map to configured score; infra errors differ from wrong answers and have safe retry/appeal behavior. | [ ] |
| RUN-07 | Sandbox escape review and language gate | 3d | RUN-03, RUN-04, RUN-05 | Each language has adversarial isolation review and resource-limit checks; unsupported runtimes cannot be enabled by tenant setting. | [ ] |
| RUN-08 | Post-exam code-similarity review | 3d | RUN-05, ATT-07, REV-01 | Evaluate local [JPlag](https://github.com/jplag/JPlag) on completed submissions with starter-code exclusion, supported-language checks and its license reviewed; results are a reviewer lead only, never automatic plagiarism findings or score changes. | [ ] |

## Phase 5 — Proctoring, events and live operations

Browser/AI signals are evidence inputs, not proof. Confidence, risk and human decision stay separate.

### What each proctoring mode can monitor

| Layer | What we can monitor | Boundary |
|---|---|---|
| Standard web browser | Page hidden/tab switch, window focus loss/regain, fullscreen exit, in-page copy/paste/context-menu attempts, navigation/reload, camera/mic/screen-share health, network/reconnect, answer-save state | [`visibilitychange`](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event) reports hidden/visible, not which application caused it. Focus loss is an indicator, not proof. A website cannot enumerate running OS apps/processes or reliably see what another app displays. |
| Permission-based screen capture | A candidate selects a tab/window/display using the [Screen Capture API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia) prompt; if granted, the selected stream can be recorded or sent to an authorized proctor and checked for track stop/loss | Capture requires a fresh user action/permission, browser support varies, and the browser may not tell us the identity of every app/window. The exam must clearly disclose what is captured. |
| Managed secure-browser exam | Configured app/process restrictions, blocked switching/shortcuts, exam-client/config verification, and supported tamper/remote-session signals | Requires an installed managed client and OS/version-specific validation. [Safe Exam Browser](https://safeexambrowser.org/developer/seb-integration.html) is the first integration candidate to evaluate; if it cannot meet a required control, scope a signed native client. No product should claim universal prevention of all bypasses. |
| AI/media signals | Face presence/count, capture obstruction/health, selected object classes, speech activity, recorded speaker turns, optionally transcribed speech | Each model has confidence/error rates. Evaluate by actual devices, lighting, language, accent and room noise; use policy thresholds and human review. Do not infer misconduct from emotion, eye-gaze direction or a single event. Coarse head-orientation-away can be evaluated as a weak, explainable contextual signal only. |

### Monitoring menu and no-paid implementation candidates

“Free” here means no per-exam AI/API fee and an ability to run open-source/local components. It does not remove server/device costs, and every model weight needs its own license/provenance check. Start with disclosed, low-intrusion signals; let each exam policy enable only what is needed.

| Monitoring need | Practical implementation | What it can and cannot tell us |
|---|---|---|
| Tab switch, minimize, browser/app backgrounding | Browser Page Visibility API (`visibilitychange`), `window` focus/blur, fullscreen-change events; no AI library required | Record hidden/focus/fullscreen events and duration. A hidden page can mean tab switch, minimize, screen lock or another app covering it; it does not identify the app or prove cheating. |
| Copy/paste and navigation | Browser `copy`/`paste`/`cut` events on the exam editor, route/history and reload telemetry | Only observe/block supported in-page actions. These events do not reliably reveal every OS clipboard operation or copying done in another app. |
| Other apps, shortcuts, process list | Managed Safe Exam Browser configuration where supported; otherwise a separately signed native managed client | A normal website cannot list processes or reliably block OS shortcuts. SEB can enforce configured permitted-process rules on supported platforms; validate a version/OS matrix and offer a non-managed accommodation path. |
| Screen/app content | User-selected screen/window/tab via `getDisplayMedia()`; optionally local OCR/object analysis on the explicitly shared stream | Requires a user gesture and fresh permission; browser support and selection vary. It can only analyze the pixels in the shared stream, not secretly inspect other windows. Explain recording, access and retention. |
| Candidate face present / extra face / face leaves view | MediaPipe Face Landmarker (`@mediapipe/tasks-vision`) or OpenCV YuNet for detection | Count faces and note presence/absence/obstruction. Occlusion, lighting and camera framing cause misses; count is a review signal, not a verdict. |
| Same candidate as reference photo | OpenCV FaceRecognizerSF + SFace candidate, behind a server-side verification boundary | Compare 1:1 embeddings at configured points; assess thresholds, presentation attacks and subgroup error locally before release. Face similarity is not proof of legal identity and cannot establish who was present at the initial capture without a trusted enrollment/human check. |
| Repeated head turns / looking away | MediaPipe Face Landmarker landmarks/transformation matrix; smooth across time and emit duration-based episodes | Estimate coarse head orientation only. Do not claim exact eye gaze, attention, intent or cheating; camera/monitor position, posture, disability and normal movement affect results. |
| Phone/book/second person in camera | MediaPipe Object Detector with a separately approved model; MediaPipe face detector for visible faces | Only supported classes in the selected model can be detected. Webcam framing and occlusion limit detection; validate on real devices and never treat a detected object/person as standalone proof. |
| Speech, silence and overlapping voices | Silero VAD; sherpa-onnx for local JS/WASM/Node speech tasks; pyannote Community-1 only as an offline recorded-audio comparison | VAD says speech-like audio occurred; diarization estimates speaker turns. Neither reliably identifies the human speaker or proves unauthorized assistance. Avoid voiceprint identity matching by default. |
| Camera/microphone/screen/network health | Browser MediaDevices/MediaStream track state, WebRTC stats where applicable, heartbeat/sequence and server receipt times | Report permission denial, muted/ended tracks, device changes, packet loss/reconnect and missing intervals separately from integrity events. Network/device failure is not misconduct. |
| Coding-exam collaboration review | Versioned editor telemetry plus local JPlag comparison of submitted code where policy allows | Similarity is a post-exam lead for human review, not proof; exclude starter/template code and account for common solutions. Keep source access restricted. |

**Recommended release order:** first build browser/session events and camera/mic health; next add user-approved screen share and face presence/count; then add calibrated 1:1 identity verification and accessible human fallback; then evaluate audio/object signals; offer managed SEB mode for exams that require process/shortcut controls. Keep managed-device restrictions optional and clearly separated from standard web mode. Do not describe tab-switch detection as AI: it is a native browser event, while OS-app identification needs a managed client.

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|
| POL-01 | Versioned proctor policy and action rules | 3d | EXM-04, IAM-05 | Identity/camera/mic/screen/browser/object/audio/reconnect/evidence rules validate and snapshot per attempt; open-book policy can disable rules. | [ ] |
| SDK-01 | Camera/microphone permission and health SDK | 3d | CAN-02, POL-01 | Shared SDK uses browser `navigator.mediaDevices.getUserMedia()` and `MediaStreamTrack` state for camera/mic permission, device selection/change and ended/muted health; candidate sees capture state and notice; failures have accessible remediation and policy behavior; no silent capture. | [ ] |
| SDK-03 | Candidate-selected screen capture and health | 3d | SDK-01, CAN-02, POL-01 | Shared SDK starts browser `navigator.mediaDevices.getDisplayMedia()` only after an explicit user action and fresh permission; records selected stream/track health, stop, mute and reconnect events; candidate can see/stop sharing; feature has browser compatibility checks, clear disclosure, policy behavior and bounded evidence retention. No hidden screen capture or claim that the web app knows every displayed app's identity. | [ ] |
| EVT-01 | Versioned event schema and validation | 2d | POL-01, DEV-04 | Contract has event ID, tenant/attempt/session, sequence, client/receipt time, severity, source, confidence and model/rule version. | [ ] |
| EVT-02 | Idempotent ingestion and append-only timeline | 3d | EVT-01, IAM-05 | Duplicate IDs are harmless; sequence/drift are tracked; receipt time is server-authoritative; history cannot be silently edited. | [ ] |
| SDK-02 | Browser integrity signals and bounded buffer | 3d | SDK-01, EVT-01 | Timestamped Page Visibility API `visibilitychange`, `document.visibilityState`, `window` focus/blur, Fullscreen API exit, in-page `copy`/`paste`/`cut`/context-menu attempts, navigation/reload and capture/network interruptions follow policy, buffer through network loss and reconcile; browser events are labeled as signals and are not treated as proof of other OS apps or clipboard contents. | [ ] |
| RT-01 | Authenticated realtime gateway and scoped channels | 3d | IAM-05, EVT-02 | Socket and each subscription authorize tenant/role/assignment; no arbitrary client channel; Redis adapter supports multiple instances. | [ ] |
| RT-02 | Presence, heartbeat and sequence replay | 3d | RT-01, SDK-02 | Presence/health update reliably; reconnect uses authorized token and replays after last acknowledged sequence. | [ ] |
| RT-03 | Candidate chat and support incident linkage | 3d | RT-01, CAN-02 | Candidate can request help by camera/mic/screen/network/browser/identity/other category; authorized proctor can initiate controlled troubleshooting; conversation and technical incidents link to the attempt timeline but remain distinct from integrity events. | [ ] |
| PRO-01 | Risk correlation and policy engine | 3d | EVT-02, POL-01 | Correlated events keep confidence separate from risk/severity; actions are explainable and policy-controlled; no AI-only auto-fail. | [ ] |
| PRO-02 | Assigned-session dashboard and proctor actions | 3d | RT-02, PRO-01, DEV-05 | Proctor sees assigned sessions/risk queue; warn/recheck/pause/escalate/terminate require scope, permission and reason audit. Candidate-facing views never expose internal suspicion/risk scores. | [ ] |
| PRO-03 | Live candidate grid and authorized media | 3d | PRO-02, SDK-01 | Grid is virtualized; authorized live media uses the approved WebRTC path; preview obeys policy/evidence access; proctor load and media errors are visible. | [ ] |
| PRO-04 | Lead escalation and SLA timers | 2d | PRO-02, IAM-01 | Unresolved high-risk alerts escalate to authorized lead/supervisor with timer and action history. | [ ] |
| PRO-05 | Proctor assignment and load balancing | 3d | PRO-02, SCH-02 | Assignments respect tenant, language/skill and active load; overload/uncovered sessions surface before start and rebalance is audited. | [ ] |
| CAM-01 | Secondary-camera pairing and health | 3d | ATT-01, IAM-05 | Short-lived token binds phone to exact attempt; heartbeat/stop/reconnect events log; feature is optional by policy. | [ ] |
| WEB-01 | Secure-browser capability and managed-device track | 3d | IAM-01, POL-01 | Evaluate an established managed client (Safe Exam Browser as an initial candidate) against a signed custom client; define OS/version matrix, signing/update, app/process allow/block, shortcut lockdown, VM/remote-session and tamper checks, support, accessibility and rollback. Normal web mode never claims OS process visibility. | [ ] |
| WEB-02 | Secure-browser integration and high-stakes gate | 3d | WEB-01, ATT-01 | Managed exam validates the per-exam Browser/Config Key and approved client/version before start; configured app/process restrictions and focus/session state are reported where the client supports them; unsupported OS or failed attestation is handled by policy with accessible remediation, audit and feature-flagged rollout. | [ ] |

## Phase 6 — Evidence, human review and appeals

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|
| EVD-01 | Private object storage and short-lived grants | 3d | DEV-06, IAM-05 | API issues scoped upload/download grants; tenant namespace/encryption enforced; media never goes through API or PostgreSQL. | [ ] |
| ATT-08 | Candidate file-upload response | 3d | ATT-01, QST-07, EVD-01 | Candidate uploads only allowed file types/sizes through scoped short-lived grants; checksum/scan status is visible and files attach to exact attempt/item. | [ ] |
| EVD-02 | Chunked evidence, checksum and async processing | 3d | EVD-01, EVT-02, DEV-06 | Upload chunks reconcile; checksum/content metadata verified; processing is queued with retry and DLQ. | [ ] |
| EVD-03 | Retention, legal hold and verified deletion | 3d | EVD-02, IAM-06 | Tenant policy controls expiry; legal hold blocks deletion; retryable deletion logs completion/failure. | [ ] |
| EVD-04 | Evidence access audit and minimized export | 2d | EVD-01, IAM-08 | Views/downloads/exports record actor, purpose, resource and scope; appeal bundles include only necessary approved evidence. | [ ] |
| REV-01 | Incident and review queue | 3d | PRO-01, EVD-02, IAM-05 | Correlated events create one case per incident; assignment/SLA queue is scoped; confidence and risk display separately. | [ ] |
| REV-02 | Synchronized event/evidence timeline | 3d | REV-01, EVD-04, EVT-02 | Reviewer sees ordered events and authorized evidence with time/sequence context and missing-media gaps. | [ ] |
| REV-03 | Reasoned decisions, escalation and second review | 3d | REV-02, IAM-06 | Decision requires category/reason; history is append-only; optional second-level review works. | [ ] |
| REV-04 | Candidate appeal case and final decision | 3d | REV-03, EVD-04 | Appeal has due status, assigned reviewer, minimized evidence, decision and immutable history; score alone cannot determine outcome. | [ ] |
| REV-05 | Reviewer portal workflow | 3d | REV-01, REV-02, REV-03, DEV-05 | Reviewer sees assigned cases only, writes notes/decisions and escalates without organization-admin access. | [ ] |
| MOD-01 | Automated, hybrid and record-review operations | 3d | PRO-01, EVD-01, REV-01 | Automated, Hybrid and Record & Review modes select explicit capture, signal and reviewer workflows. | [ ] |
| MOD-02 | Test-center and hybrid-classroom operations | 3d | SCH-01, ATT-01, POL-01 | In-person, remote and mixed cohorts use distinct session, proctor and evidence rules. | [ ] |

## Phase 7 — Complete role portals and support

Each app calls shared services. No portal owns a duplicate backend or business rules.

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|
| PORT-01 | Student history and permitted results | 2d | ATT-07, GRADE-01, DEV-05 | Student sees own completed attempts and only released results/feedback; result access follows organization policy. | [ ] |
| ORG-01 | Organization profile and branding | 2d | IAM-03, DEV-05 | Admin updates permitted organization profile/branding; changes are tenant-scoped and audited. | [ ] |
| ORG-02 | Organization members and role assignments | 3d | IAM-03, IAM-05, DEV-05 | Admin manages members and scoped product roles; cannot grant platform/cloud roles. | [ ] |
| ORG-03 | Candidate and proctor pools | 3d | SCH-02, IAM-05, DEV-05 | Admin sees/manages only own-organization candidate/proctor records and assignment eligibility. | [ ] |
| ORG-04 | Organization policy and retention settings | 3d | POL-01, EVD-03, IAM-05 | Admin configures allowed policies within platform guardrails; changes are versioned/audited. | [ ] |
| EXUI-01 | Exam Manager operations dashboard | 2d | EXM-06, SCH-03, GRADE-01, DEV-05 | Manager sees exam status, assignments, schedule readiness and results for own organization. | [ ] |
| EXUI-02 | Exam operations and candidate interventions | 3d | EXUI-01, PRO-02, IAM-05 | Authorized manager performs policy-allowed interventions with an audit reason. | [ ] |
| SUP-01 | Support ticket queue and status workflow | 2d | IAM-08, DEV-05 | Support agent triages/assigns tickets with customer-visible status and service-level metadata. | [ ] |
| SUP-02 | Restricted account/session diagnostics | 3d | SUP-01, IAM-08 | Support inspects operational metadata and requests temporary elevation; raw evidence/result editing is denied by default. | [ ] |
| ADM-01 | Platform organization lifecycle | 2d | IAM-06, DEV-05 | Super Admin suspends/reactivates organizations; every change has reason and audit record. | [ ] |
| ADM-02 | Global app roles and feature flags | 3d | ADM-01, IAM-08 | Super Admin manages app policy/flags with environment- and tenant-level rollout, canary percentages and rollback; security-sensitive flags are server-controlled, audited and reversible. | [ ] |
| MKT-01 | Public home page and marketing app foundation | 3d | DEV-05 | `apps/marketing` is independently runnable/deployable; responsive home page explains the platform and links to Services, Packages, Contact and Login; metadata/SEO, accessible navigation and privacy/terms links are present; no customer or exam data is exposed. | [ ] |
| PORT-07 | Candidate support ticket lifecycle | 2d | CAN-02, RT-03, SUP-01 | Candidate receives ticket ID/status; diagnostics link to attempt without unnecessary answers/media. | [ ] |
| PORT-08 | Localization and accessible accommodations | 3d | DEV-05, EXM-01, CAN-01 | Instructions are localizable; keyboard/screen-reader/contrast/text sizing work; accommodations snapshot with policy. | [ ] |

## Phase 8 — APIs, integrations, notifications, reports and analytics

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|
| API-01 | OpenAPI, DTO validation and error envelope | 3d | IAM-05, DEV-04 | OpenAPI is source of truth; schemas reject invalid fields; stable error codes/correlation IDs and safe messages. | [ ] |
| API-02 | Typed client, pagination, quotas and idempotency | 3d | API-01, ATT-05 | Shared client covers portal use; large collections cursor-paginate; mutations use idempotency; tenant quotas/rate limits apply. | [ ] |
| INT-01 | Signed webhooks, retries and replay guard | 3d | API-01, DEV-06 | Signed tenant webhooks use timestamp/nonce, retry schedule, delivery log, replay guard and DLQ. | [ ] |
| INT-02 | SAML, domain verification and JIT provisioning | 3d | IAM-02, IAM-03 | Tenant-bound SAML is audited; verified domain/JIT flow cannot create cross-tenant membership. | [ ] |
| ORG-05 | Organization integration and security settings | 3d | INT-01, INT-02, API-01, DEV-05 | Admin configures tenant integrations/security; secrets are masked and never returned after write. | [ ] |
| INT-03 | SCIM 2.0 lifecycle and group provisioning | 3d | INT-02, IAM-03 | Authorized sync handles user/group lifecycle, replay/rate limits and disabled-user session revocation. | [ ] |
| INT-04 | LTI 1.3 launch, deep link and grade passback | 3d | IAM-02, API-01, GRADE-01 | Validates launch claims/state/nonce; links approved exam version; grade passback is scoped/retryable/reconciled. | [ ] |
| INT-05 | CSV bulk import/export | 2d | SCH-02, API-01 | Candidate/user/assignment import previews row errors; exports are tenant-scoped, audited and field-minimized. | [ ] |
| INT-06 | LMS/ATS/HR connector framework | 3d | INT-01, INT-04 | Adapters share auth, retries, mapping and event logs; first connector has field mapping and reconciliation. | [ ] |
| INT-07 | Service accounts, API credentials and event streaming | 3d | API-02, IAM-06 | Machine identities have scoped permissions, rotation/revocation, usage audit and optional tenant event stream; they are separate from human sessions. | [ ] |
| NOT-01 | Notification provider abstraction | 3d | DEV-06, IAM-06 | Invitations/reminders/alerts/results/security notices use templates, provider adapter, retries and suppression rules; local development uses the local mail catcher. | [ ] |
| RPT-01 | Async tenant-scoped report generation | 3d | DEV-06, IAM-05, API-02 | Reports run outside API; job state/exports are scoped, audited and use expiring links. | [ ] |
| ANA-01 | Exam/question/candidate/proctor metrics | 3d | GRADE-01, REV-01, RPT-01 | Exam dashboard shows assigned/started/in-progress/submitted/absent counts, completion, score summaries when authorized, review queue, proctor load and system health with metric definitions and time-zone context. | [ ] |
| ANA-05 | Organizer candidate roster and operational analytics | 3d | ANA-01, IAM-05, SCH-02, ATT-07 | Authorized exam staff can filter the assigned roster by candidate ID/name and permitted contact field, invitation/delivery, readiness, attendance, attempt state, last heartbeat, submission and review status; device/browser readiness is shown without invasive fingerprinting; each field has a defined source/time and organization scope; no passwords, biometric templates or unrestricted raw media appear in analytics. | [ ] |
| ANA-06 | Per-candidate attempt timeline and report | 3d | ANA-05, EVT-02, REV-02, GRADE-01 | Authorized staff can review attempt start/end/duration, save/connection gaps, section/question timing, answer state and response content for roles/policies that permit it, released/authorized scores, proctor signals with timestamp/confidence/source, human actions/review outcomes and support incidents; proctors do not get answer keys, and hidden tests remain hidden; evidence links obey role/retention controls; exports are minimized/audited. | [ ] |
| ORG-06 | Organization reports and audit views | 3d | ANA-01, IAM-06, DEV-05 | Admin sees scoped reports/audit; restricted evidence and cross-tenant data remain inaccessible. | [ ] |
| ANA-02 | Psychometrics, item analysis and exposure | 3d | ANA-01, EXM-03 | Difficulty/discrimination, distractors, blueprint, valid reliability, form equivalence and exposure are separate from integrity risk. | [ ] |
| ANA-04 | Exam health and post-exam integrity summary | 3d | ANA-01, REV-01, RPT-01 | Tenant-scoped exam health and post-exam integrity summary combine delivery/reliability metrics with reviewed incidents, unresolved cases and actions; model signal confidence remains distinct from human decisions. | [ ] |
| BILL-01 | Entitlements, usage quotas and billing seam | 3d | ADM-02, API-02, ANA-01 | Plans/features/quotas are tenant-scoped/audited; usage forecasting and first billing adapter do not grant extra access. | [ ] |
| BILL-02 | Versioned package and plan catalog | 3d | BILL-01, API-01, ADM-02 | Backend catalog models published products/packages, plan features, quotas, currency, billing interval, availability and effective dates; changes are versioned/audited and public responses contain only published safe fields. | [ ] |
| ADM-07 | Super Admin package and plan management | 3d | BILL-02, IAM-08, DEV-05 | Super Admin can draft, preview, publish, retire and roll back catalog versions; changes require permission and audit reason; editing a plan cannot silently alter an existing customer entitlement or paid subscription. | [ ] |
| MKT-02 | Public package and pricing catalogue | 3d | MKT-01, BILL-02, API-02 | `apps/marketing` renders published packages/plans from the shared API, supports feature comparison and clear pricing/billing terms, and shows no draft or tenant-private data; primary action is Contact Sales/Request Demo, not public registration; no hard-coded price or checkout credential in frontend bundles. | [ ] |
| MKT-03 | Customer login page and SSO handoff | 2d | MKT-01, IAM-02, IAM-05 | Login page hands existing customers to shared OIDC, then routes by authorized role; it does not create accounts, collect a second password or expose role selection as authorization. Recovery uses the identity provider's approved flow. | [ ] |
| MKT-04 | Contact sales and request-a-demo workflow | 3d | MKT-01, API-01, NOT-01 | Public form collects only business contact, organization, requested services and message; validates and rate-limits submissions, records notice/consent, creates a restricted sales lead and sends acknowledgement/notification; it creates no tenant or user account. | [ ] |
| MKT-05 | Services and solution pages | 2d | MKT-01, MKT-02 | Public Services page explains assessment, coding, monitoring, review and enterprise integrations; claims show current availability/roadmap accurately, accessibility/SEO are covered, and CTAs lead to packages or Contact Sales. | [ ] |
| ADM-08 | Sales-led organization and customer-account provisioning | 3d | MKT-04, BILL-02, IAM-03, IAM-05, IAM-06 | Authorized staff review a sales lead, create/verify the organization, choose an approved package/plan, set the first organization admin and provision only requested users/candidates; duplicate checks, approval/reason, tenant boundaries and immutable audit history are enforced. Follow-on NOT-02 sends the owner invitation. No public self-signup. | [ ] |
| BILL-03 | Sales-approved hosted payment and confirmation | 3d | MKT-04, BILL-02, INT-01, IAM-05 | For an approved quote/order, use replaceable provider-hosted checkout/payment link; do not store card data; signed webhooks are verified/idempotent and reconcile order/payment before staff activates paid entitlement. Document provider transaction fees and sandbox/live credentials separately. | [ ] |
| BILL-04 | Subscription lifecycle, invoices and cancellation | 3d | BILL-03, BILL-02, IAM-05 | Customer can view subscription status, renewal/expiry and invoices, and follow audited cancellation/plan-change/refund paths; provider events reconcile idempotently, applicable tax/invoice requirements are configurable, and access changes follow versioned entitlement policy. | [ ] |
| NOT-02 | Secure account invitation and activation | 3d | NOT-01, IAM-02, IAM-06, ADM-08 | Admin-provisioned organization owners/users receive a scoped, expiring, single-use activation or OIDC invitation link with recipient, organization and support details; never email a permanent or temporary password; resends/revokes are rate-limited and audited. | [ ] |
| NOT-03 | Candidate exam invitation and reminders | 3d | NOT-01, SCH-02, ATT-01, CAN-01 | Candidate email states exam name, exact date/time/time zone, join URL, candidate/exam reference, readiness checklist, allowed capture/proctoring notice and support path; it uses SSO or a short-lived one-time sign-in link, never a password; schedule changes/cancellations/reminders are idempotent and logged. | [ ] |
| ADM-03 | Platform usage overview | 2d | ANA-01, BILL-01, DEV-05 | Super Admin sees aggregate tenant usage and entitlements without automatic raw-evidence access. | [ ] |

## Phase 9 — AI signals, governance and responsible use

Browser-first, optional signals come first. Heavy server inference is separate and never blocks ordinary exam submission.

### Proposed AI implementation direction

The target is a high-stakes assessment platform, so language choice follows model quality, isolation, support and evaluation needs. Keep the main product/API in TypeScript/NestJS; keep browser capture and lightweight, permission-aware signals in the proctoring SDK. Use a separately deployed Python/FastAPI AI service for server-side model workflows where its mature audio/ML ecosystem is useful. This is the recommended starting direction, subject to the library/model evaluation story below—not a reason to put every model in Python.

| Capability | Initial candidate | Placement and boundary |
|---|---|---|
| Face presence, face count and capture health | [MediaPipe Tasks Vision (`@mediapipe/tasks-vision`)](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js) | Browser-side, low-latency signals. Face count/presence and coarse head orientation may be emitted; repeated/prolonged head turns are weak contextual events, not proof of where the candidate is looking or why. Do not infer emotion or intent. Review SDK telemetry and model-asset terms before shipping. |
| Candidate 1:1 face verification | [OpenCV FaceRecognizerSF + OpenCV Zoo SFace](https://github.com/opencv/opencv_zoo/tree/main/models/face_recognition_sface), with YuNet or MediaPipe for face detection/alignment | Self-hosted/local candidate to compare the exam-start reference photo with later live captures. Zoo lists SFace files as Apache-2.0, but pin the exact weight/checksum and verify provenance, redistribution and deployment terms before release. Calibrate the match threshold on consented, representative validation data; a score is not a decision. Do not use public InsightFace pretrained weights for a commercial product: their published terms say non-commercial research only. |
| Audio speech / silence detection | [Silero VAD](https://github.com/snakers4/silero-vad) | Evaluate for short live audio chunks; emit timestamped speech-activity signal only, not transcript or guilt. |
| Speaker turns / overlapping voices | [`sherpa-onnx`](https://github.com/k2-fsa/sherpa-onnx) first candidate for JS/WASM or Node local inference; [`pyannote.audio` Community-1](https://github.com/pyannote/pyannote-audio) quality comparison for recorded audio | No paid inference API. Evaluate locally; sherpa-onnx engine is Apache-2.0, but each downloaded ONNX model has its own terms. pyannote.audio code is MIT, while Community-1 model access has user conditions and its model card/license must be checked (CC-BY-4.0 attribution); it is an asynchronous recorded-audio path, not live streaming. Do not use pyannoteAI hosted premium service. |
| Optional speech-to-text | [`faster-whisper`](https://github.com/SYSTRAN/faster-whisper) (Whisper model) | Separate, policy-enabled analysis only when transcript text is necessary. Keep transcription off by default until privacy, supported-language accuracy and retention are approved. |

**Cost and licensing rule:** use local/self-hosted inference and do not call paid AI APIs. “Open-source library” does not automatically mean every model weight is unrestricted: pin the exact model version, record its source/checksum/license and required attribution or access conditions before shipping. Compute, storage and bandwidth can still have infrastructure costs in production. The product includes candidate face verification; treat reference photos, face templates/embeddings and match outcomes as restricted biometric data, with explicit notice/policy, purpose limitation, encryption, access audit, short retention and deletion. Keep an equivalent human/manual verification path for capture failure, low confidence, disability/accommodation or appeal. Never auto-reject from one face score.
| Model runtimes and preprocessing | [PyTorch](https://pytorch.org/) for supported models; [ONNX Runtime](https://onnxruntime.ai/docs/) where conversion is supported and benchmarked; [OpenCV](https://opencv.org/) for media/frame decoding and preprocessing | Choose per model after accuracy/latency/device benchmarks; do not force every model through one runtime. |

Software package licenses do not automatically settle model-weight, dataset, or redistribution terms. Pin model versions and checksums, record provenance/license/consent, run telemetry/privacy review, and benchmark the actual supported browsers, devices, languages, accents, rooms and noise conditions. Any candidate score/signal is review evidence, not an automatic adverse decision.

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|
| AI-01 | Browser inference adapter and model metadata | 3d | SDK-01, DEV-02 | Prototype [`@mediapipe/tasks-vision` FaceLandmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js) for face presence/count and facial landmarks; model/library versions, checksums, provenance and terms are recorded; browser/CPU fallback and privacy-approved telemetry behavior are verified; compute, bandwidth, storage and support costs are tracked; fallback does not block exam. | [ ] |
| AI-02 | Face/presence, head-pose and capture-health signals | 3d | AI-01, EVT-01 | MediaPipe FaceLandmarker emits face absent/present/count, obstruction/health and optional smoothed, duration-based head-orientation-away episodes with confidence/timestamps/model provenance; no exact gaze, emotion, intent or cheating claims; glasses, lighting, posture, monitor placement and accommodations are evaluated; a glance never auto-fails. | [ ] |
| AI-03 | Server AI boundary and model versioning | 3d | EVT-02, DEV-04 | Separate Python/FastAPI service has authenticated contract, versioned metadata, bounded I/O and latency/health telemetry; PyTorch/ONNX Runtime are selected per model benchmark and never execute candidate code. | [ ] |
| AI-04 | Evaluation dataset and false-positive/negative gates | 3d | AI-01, AI-03, DEV-02 | Dataset provenance/consent/split documented; face verification FMR/FNMR and presentation-attack testing, plus other signal precision/recall/FPR/FNR/latency and subgroup results across supported devices, skin tones, age ranges, lighting, noise and connectivity are measured before promotion. No demographic group is silently excluded; thresholds and a human fallback are approved before production. | [ ] |
| AI-05 | Audio event adapter and license review | 3d | AI-03, AI-04, POL-01 | [`Silero VAD`](https://github.com/snakers4/silero-vad) (MIT) and [`sherpa-onnx`](https://github.com/k2-fsa/sherpa-onnx) (Apache-2.0 runtime) are evaluated for local speech-activity/audio-event inference; each downloaded model has its own terms/provenance; output is timestamped signal, not identity or verdict. | [ ] |
| AI-08 | Live speech activity and recorded speaker-turn evaluation | 3d | AI-03, AI-04, AI-05, EVT-01 | Benchmark Silero VAD for live speech segments and sherpa-onnx JS/WASM or Node diarization; compare [`pyannote.audio` Community-1](https://github.com/pyannote/pyannote-audio) only for asynchronous recorded audio and overlapping-speaker segments, after model conditions/license review; no voiceprint identity claim. Measure supported languages/noise, latency and false alerts; output is review evidence, never a verdict. | [ ] |
| AI-10 | Webcam object detection evaluation | 3d | AI-01, AI-04, EVT-01, POL-01 | Evaluate [MediaPipe Tasks Vision ObjectDetector](https://ai.google.dev/edge/mediapipe/solutions/vision/object_detector) with a pinned, separately licensed model for configured classes such as phone/book; document classes it actually supports, model checksum/license and CPU performance; measure per-class misses/false alerts across supported cameras, angles and lighting; detection never auto-fails. | [ ] |
| AI-06 | Rule/model approval, canary and rollback | 3d | PRO-01, AI-04, AI-08, ADM-02 | Versions/approvals immutable; staged rollout and rollback exist; high-stakes adverse decisions require human review. | [ ] |
| AI-07 | AI-assistance/deepfake research track | 3d | AI-04, AI-06, REV-04 | Isolated behind flags and enabled only after legal/privacy/validity review; signal is never represented as proof. | [ ] |
| ADM-06 | Super Admin policy templates and model registry controls | 3d | ADM-02, AI-06, POL-01 | Authorized platform admins manage approved policy templates and view/approve model versions, canaries and rollback state; all changes are versioned/audited and engineering IAM stays separate. | [ ] |

## Phase 10 — Privacy, security and data lifecycle

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|
| PRIV-01 | Data inventory, classification and purpose | 2d | IAM-01, EVD-01 | Public/internal/confidential/restricted/secrets inventory maps purpose, owner, access, storage and retention for platform data. | [ ] |
| PRIV-02 | Consent, notice and data-subject operations | 3d | PRIV-01, CAN-01, IAM-05 | Notice/consent is policy/jurisdiction configurable; export/deletion requests are tracked with legal/audit constraints. | [ ] |
| AI-09 | Optional policy-controlled speech transcription | 3d | AI-08, AI-04, PRIV-02 | faster-whisper/Whisper is evaluated for approved languages; transcription is disabled by default, explicitly disclosed and policy-enabled, transcript access/retention are restricted, and transcript text alone cannot trigger an adverse decision. | [ ] |
| IDV-01 | Identity-proofing policy and self-hosted model approval | 2d | PRIV-01, PRIV-02, IAM-05 | Decide how the initial person is bound to the authorized candidate (trusted enrollment/ID record or trained human check); a newly taken selfie alone only becomes a reference and does not prove the person's real-world identity. Select local model/runtime only after exact code/model/license and provenance review; document supported jurisdictions, lawful basis/notice, data minimization, retention, human exception path and policy behavior. No paid face API. | [ ] |
| IDV-02 | Candidate reference photo, 1:1 face verification and presentation-attack checks | 5d | IDV-01, CAN-01, REV-04, AI-04 | After the initial identity is bound to the authorized candidate, enroll a quality-checked reference image; use OpenCV FaceRecognizerSF + a pinned SFace model for 1:1 verification, with YuNet or MediaPipe for detection/alignment, then compare at start and policy-defined intervals/events using validated thresholds. Bind outcomes to attempt with model/version, timestamp and quality/confidence. Evaluate printed-photo, screen-replay and mask attacks; uncertain/absent/multiple-face/low-quality results prompt recapture or human review, never auto-rejection. Record exact weight license/provenance; encrypt and restrict raw captures/templates under approved short retention; provide accessible manual verification and appeal. | [ ] |
| IDV-03 | Identity decision, retention and appeal workflow | 3d | IDV-02, EVD-03, REV-04 | Identity evidence follows restricted access/retention; candidate can recover/appeal; failed model signal alone does not finalize an adverse decision; reviewer sees reason codes and enough evidence for a fair re-check. | [ ] |
| IDV-04 | Room-scan capture and review | 3d | IDV-01, POL-01, EVD-01, REV-01 | Optional room scan is disclosed, consent/policy-controlled and attempt-bound; capture is minimized, access/retention are restricted, and uncertain results route to human review. | [ ] |
| PRIV-03 | Retention coverage for personal/evidence data | 3d | PRIV-01, EVD-03 | Retention covers media/events/identity/results/logs/exports; holds and deletion verification are observable. | [ ] |
| SEC-01 | Threat model and abuse controls | 3d | IAM-05, RUN-01, EVD-01 | Covers tenant breakout, session theft, replay, upload abuse, socket quotas and sandbox escape; controls have owners and verification notes. | [ ] |
| ADM-04 | Security incidents and audit oversight | 3d | SEC-01, IAM-06, DEV-05 | Super Admin reviews platform incidents/audits; evidence access still requires separate elevation. | [ ] |
| SEC-02 | Browser/API hardening | 3d | API-01, IAM-05 | TLS/security headers/CSP/CSRF where relevant, secure cookies, rate limits, upload validation and secret-safe errors configured. | [ ] |
| SEC-03 | Supply-chain and artifact security | 3d | DEV-03 | Lockfile scanning, dependency/SAST/container scanning, SBOM, immutable signed artifacts, CODEOWNERS and protected-branch required reviews in CI. | [ ] |
| SEC-04 | Privileged/evidence access audit review | 2d | IAM-08, EVD-04, SEC-01 | Review verifies least-privilege access, reasons/elevation/expiry and audit integrity across support and product roles. | [ ] |
| SEC-05 | Cross-tenant and privilege-escalation suite | 3d | IAM-05, SEC-01 | Automated scenarios try cross-tenant IDs, role escalation, unauthorized channels/evidence/result mutation; all deny safely. | [ ] |
| SEC-06 | Abuse, rate and device/session controls | 3d | IAM-07, API-02, RT-01, EVD-01 | Login/OTP/MFA and exam-start throttles, upload quotas, WebSocket limits, tenant API quotas, WAF/DDoS controls and IP/device/session anomaly alerts are configured and observable. | [ ] |
| SEC-07 | Independent penetration test and remediation gate | 3d | SEC-02, SEC-05, SEC-06, RUN-07, INF-04 | Before production launch and after material auth/runner changes, an independent qualified tester assesses public APIs/apps, tenant authorization, realtime channels, uploads/evidence and code-runner boundaries; findings are risk-ranked, fixed and retested, with no unresolved critical/high finding accepted without a documented owner and explicit risk approval. External scheduling/report time is additional. | [ ] |
| SEC-08 | Security incident response and tabletop | 3d | SEC-01, SEC-04, OBS-02, INF-02 | Runbook covers detection, containment, evidence preservation, credential/key revocation, recovery, decision ownership and legally reviewed customer/regulator notification; rehearse leaked credentials, tenant data exposure and runner compromise, record actions and close gaps. | [ ] |

## Phase 11 — Operations, reliability, infrastructure and release

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|
| OBS-01 | OpenTelemetry traces, metrics and safe logs | 3d | DEV-04 | API/realtime/workers/queue/DB/AI have correlation, metrics/traces and restricted-data redaction. | [ ] |
| ANA-03 | Capacity and exam-readiness dashboard | 3d | OBS-01, PRO-02, RPT-01 | Before launch, operators can gate exam readiness on candidate/proctor counts and realtime, AI, storage and queue capacity; dashboard shows active exams/users and start/submission health. | [ ] |
| OBS-02 | SLOs, alerts and operational runbooks | 3d | OBS-01, ANA-03 | Measured auth/API/realtime/start/submission/evidence objectives; alert/runbook covers exam readiness and incidents. | [ ] |
| OBS-03 | Platform incident banner and status page | 2d | OBS-01, IAM-06 | Authorized operators publish scoped incident banner/status updates; updates are audited and do not expose tenant/candidate data. | [ ] |
| ADM-05 | Super Admin live operations and retention dashboard | 3d | ADM-01, ADM-02, OBS-01, EVD-03 | Super Admin sees platform health, live-session oversight and retention/deletion job status; any intervention is permission-checked and audited, with no default raw-evidence access. | [ ] |
| REL-01 | Queue retry, DLQ, idempotency and backlog ops | 3d | RUN-02, RPT-01, EVD-02 | Bounded retries, DLQ, safe inspection/replay and duplicate-safe business effects. | [ ] |
| REL-02 | Database backup, restore and migrations | 3d | IAM-04, DEV-03 | Automated backup and restore rehearsal; migrations backward compatible with rollback/forward-fix procedure. | [ ] |
| REL-03 | Redis/realtime failure behavior | 3d | RT-02, OBS-01 | Outage/reconnect/replay behavior, health checks and alerts are documented and exercised without losing durable answers/events. | [ ] |
| REL-04 | Storage durability and deletion recovery | 2d | EVD-03, OBS-01 | Upload failures, retry, version/replication choice and deletion alarms have recovery path. | [ ] |
| REL-05 | Chaos and failure exercises | 3d | REL-01, REL-02, REL-03, REL-04 | Rehearse Postgres/Redis outage, worker crash, realtime restart, storage/network/model failure, high API latency, duplicate events/submits, browser crash/reconnect and queue backlog; record expected integrity/alert. | [ ] |
| INF-01 | Terraform environments and account boundaries | 3d | DEV-02, SEC-01 | Dev/staging/prod are declared as code with account/project boundaries and least-privilege identities. | [ ] |
| INF-02 | AWS network, ECS/Fargate, WAF and secrets | 3d | INF-01, SEC-02 | Private DB, network policy, CDN/WAF, IAM Identity Center, KMS and Secrets Manager; no long-lived developer keys. | [ ] |
| INF-05 | Secret and encryption-key lifecycle | 2d | INF-02, SEC-03, PRIV-01 | Production secrets and encryption keys have named owners, least-privilege access, documented rotation/revocation and recovery procedures; rotation is exercised in staging, and suspected exposure triggers revocation without logging secret values. | [ ] |
| INF-03 | S3 evidence, KMS and production queue | 3d | INF-02, EVD-01, RUN-02 | Private encrypted S3 and SQS/DLQ use scoped roles, lifecycle/retention and alarms; no public bucket. | [ ] |
| INF-04 | Container deploy and independent scaling | 3d | INF-02, DEV-03 | Apps/services build immutable artifacts and deploy independently; scale by app load, socket count, event rate or queue depth. | [ ] |
| REL-06 | Capacity and exam-start load evaluation | 3d | INF-04, OBS-02 | k6 covers start spikes, autosave, event bursts, proctor sockets and uploads; concurrency target follows measured results. | [ ] |
| REL-07 | DR, RTO/RPO and multi-region readiness | 3d | REL-02, INF-03 | Set measured RTO/RPO, test restore/failover, document initial single-region deployment and avoid needless region assumptions. | [ ] |
| REL-08 | Release gates, canary, smoke and rollback | 3d | SEC-03, REL-02, REL-06 | CI deploys immutable artifacts through staging, E2E/security/load smoke, approval, canary/rolling production and rollback checks. | [ ] |
| REL-09 | Enterprise readiness sign-off | 3d | All prior phases | Checklist covers isolation, permissions, versions, recovery, privacy, accessibility, AI FP/FN, licenses, audit, runbooks and rollback; no silent waiver. | [ ] |

## Phase 12 — Later product extensions

These remain in the requested full scope, after the secure core and first operational release.

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|
| EXT-01 | Adaptive testing/CAT behind a feature flag | 3d | ANA-02, EXM-02, GRADE-01 | Selection is reviewed, versioned, reproducible and opt-in; fixed forms remain available. | [ ] |
| EXT-02 | Similar-question and leak monitoring | 3d | QST-05, EXM-03, ANA-02 | Similarity/exposure indicators inform reviewers; no item auto-retires without authorized review. | [ ] |
| EXT-03 | Dynamic candidate/question watermark | 3d | ATT-01, QST-05, SEC-02 | Watermark is attempt-scoped, policy-controlled/audited; does not claim impossible screen-capture detection. | [ ] |
| EXT-04 | Additional LMS/ATS connectors | 3d | INT-06 | Each connector documents version, mapping, credential lifecycle, retry/reconciliation and owner. | [ ] |
| EXT-05 | Marketplace/plugin ecosystem | 3d | API-02, INT-01, SEC-03 | Extensions use scoped APIs, signed events, review, versioning and revocation; no implicit tenant-wide access. | [ ] |
| EXT-06 | Expanded liveness/identity and second-camera options | 3d | CAM-01, AI-04, PRIV-02, REV-04 | Vendor/model is reviewed for privacy/accessibility/validity; feature is opt-in, human-reviewable and reversible. | [ ] |

## Phase 13 — Interviews and coding interviews

Interviews are a first-class AptiVigil product workflow alongside exams. Build them on the shared identity, scheduling, realtime, evidence, code-runner and review foundations rather than creating a disconnected app. These stories are full product scope; dependencies determine when they can ship.

| ID | Story | Estimate | Depends on | Acceptance / handoff | Status |
|---|---|---:|---|---|
| INTW-01 | Interview program, stages and reusable rubric | 3d | IAM-05, QST-01 | Organization staff configure interview types (structured, technical/coding, panel), stages, competencies, rubric versions and authorized interviewer roles; each change is scoped and audited. | [ ] |
| INTW-02 | Candidate pipeline, scheduling and invitations | 3d | INTW-01, SCH-02, NOT-03 | Staff schedule one-to-one or panel sessions with time zone, availability, reschedule/cancel and secure candidate invitations; candidate receives clear instructions and accessibility/support options. | [ ] |
| INTW-03 | Live interview room and session controls | 3d | INTW-02, RT-02, CAM-01 | Candidate and assigned interviewers join an authenticated audio/video session with connection checks, waiting room, panel roles, chat and host controls; media recording is off unless separately authorized and disclosed. | [ ] |
| INTW-04 | Collaborative coding interview workspace | 3d | INTW-03, QST-04, ATT-04, RUN-04 | Interviewer and candidate collaborate in an isolated coding workspace with language/runtime limits, private tests, controlled run/submit, session timeline and interviewer notes; candidate code never runs in the API or realtime service. | [ ] |
| INTW-05 | Interview scorecards and independent feedback | 3d | INTW-01, GRADE-01, REV-01 | Interviewers submit rubric-linked evidence and feedback independently before seeing others' scores; authorized lead can reconcile feedback with rationale; no automatic hire/reject recommendation is presented as a decision. | [ ] |
| INTW-06 | Optional recording, transcript and retention controls | 3d | INTW-03, EVD-01, PRIV-02, NOT-01 | Organization policy controls recording/transcription; candidates receive notice and meaningful alternatives; access is least-privilege, audited, retention-bounded and deletable, with regional/language accuracy documented. | [ ] |
| INTW-07 | AI-assisted interview notes and question support | 3d | INTW-05, INTW-06, AI-01, PRIV-02 | Optional AI can draft transcript summaries or rubric-linked evidence/question suggestions; every output links to source context, is labeled AI-generated, editable and reviewable; no autonomous ranking, admission or hiring decision. | [ ] |
| INTW-08 | Interview analytics and candidate report | 3d | INTW-05, RPT-01, ANA-01 | Authorized organization staff view stage completion, interviewer feedback, rubric evidence and candidate outcomes; comparisons are configurable, explainable and access-controlled, with protected traits and irrelevant proctoring signals excluded from scoring. | [ ] |

## First four weeks — suggested solo sequence

Assume about five focused workdays per week; reserve some time for setup/debugging and review. Do not start a second story just to fill a calendar slot.

1. **Week 1:** DEV-02 and DEV-03 (about 4 days): record decisions and make locked installs/builds repeatable.
2. **Week 2:** DEV-04 and IAM-01 (about 5 days): add config/logging conventions and agree the role matrix.
3. **Week 3:** IAM-02 (about 3 days): implement the chosen OIDC login/session path; use remaining time for review and integration fixes.
4. **Week 4:** IAM-03 (about 3 days): model organization membership and role assignment, then review before tenant data endpoints.

Next are IAM-04 and IAM-05. Do not put real customer data flows ahead of tenant guards. Then continue by dependencies. First useful vertical slice: manager publishes an exam with MCQ + essay + code → assigns one candidate → candidate resumes/submits → MCQ scores, essay queues for grading, code queues to the isolated runner → reviewer sees the attempt and audit trail.

## Solo effort estimate

The backlog contains 186 small stories: 185 remain after DEV-01, which is marked Done. Their estimates total about 530 focused developer-days remaining (532 days across all stories), or roughly 106 five-day developer-weeks (about 24 full-time months), before waiting on identity/payment/storage/LMS vendors, external penetration testing, accessibility review or customer policy decisions. Interview stories are included. Treat this as an order-of-magnitude planning number; after the first 8–10 accepted stories, recalibrate estimates from actual pace. A single developer should plan this as a multi-release product, not a short build sprint.

## Current repository baseline

The repo has seven role-portal shells plus the public marketing app, a shared NestJS health/OpenAPI entrypoint, a starter Prisma schema and local Postgres/Redis setup. These are scaffolding, not accepted product stories. No central login/authorization, customer onboarding, plan catalog/checkout, exam or interview API workflow, WebSocket gateway, evidence store, queue worker, code sandbox, AI model service or cloud deployment is complete yet. Re-check acceptance conditions before marking anything Done.

## Coverage map

| Source architecture area | Backlog |
|---|---|
| Single repo, seven role portals plus public marketing app, shared packages, local setup | DEV, MKT, PORT, INF |
| Authentication, roles, tenancy, product/engineering access planes | IAM, SEC |
| Question bank, authoring UI, exam lifecycle, scheduling, candidate runtime | QST, EXM, SCH, CAN, ATT, GRADE |
| MCQ, essay, coding, isolated execution and code-similarity review | QST-02/03/04, ATT-02/03/04, RUN |
| Structured/video interviews, coding interviews, scorecards, optional AI assistance and interview analytics | INTW-01–08, RT, EVD, RUN, REV, ANA |
| Browser signals, event contract, realtime/live proctoring/modes/cameras/secure browser | POL, SDK, EVT, RT, PRO, MOD, CAM, WEB |
| Room scan and identity/liveness workflows | IDV, EVD, REV |
| AI, policy/risk, governance and human decision | POL, AI, PRO, REV |
| Evidence, retention, appeals, room scan and audit | EVD, REV, IAM-06, PRIV, IDV |
| Role portal workflows, public marketing/contact/login, sales-led onboarding and restricted support | PORT, MKT, ADM-08 |
| REST/OpenAPI, SAML/OIDC/SCIM/LTI, webhooks, connectors, notifications | API, IAM, INT, NOT |
| Reports, psychometrics, per-candidate exam analytics, operations, entitlements, package catalog/checkout and model/policy administration | RPT, ANA, BILL, MKT, ADM-05/06/07/08, AI-06 |
| Sales/demo leads, staff-provisioned organizations, secure invitations and per-candidate exam reporting | MKT, ADM-08, NOT, ANA-05/06 |
| Privacy, accessibility, abuse protection, security, DR, observability, CI/CD, IaC, scaling | PRIV, SEC, OBS, REL, INF |
| AI cost/license governance, face/head signals, object detection, VAD, diarization, optional ASR and post-exam integrity summary | AI-01/02/05/06/08/09/10, ANA-04 |
| Adaptive exams and ecosystem roadmap | EXT |
