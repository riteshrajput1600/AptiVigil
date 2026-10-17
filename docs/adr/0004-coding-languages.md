# ADR-0004: Initial coding languages

- Status: Accepted for first runner profiles
- Decision: Start with JavaScript/TypeScript (Node.js 22), Python 3.12, Java 21 and C++20 for coding assessments and interviews. Compile/run each submission in an isolated, resource-limited sandbox with pinned toolchains.
- Boundary: The language list describes intended profiles, not a currently available code execution feature. Never execute candidate code in the API, web app or worker host. Add a language only with a reviewed image, limits, test harness and abuse controls.
- Revisit when: Candidate/customer demand, runtime support and secure isolation are demonstrated.
