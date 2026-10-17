# ADR-0001: Identity and OIDC

- Status: Accepted for implementation
- Decision: Integrate all role portals with a standards-based OIDC provider. Use Keycloak as the local/self-managed development provider; keep provider-specific code behind OIDC discovery and claims mapping. Do not implement passwords or public self-registration in AptiVigil.
- Rationale: A shared identity and session lifecycle is needed across the seven role portals, with tenant membership and permissions enforced by the API.
- Production boundary: Select hosted versus self-managed Keycloak only after operational ownership, availability, MFA, data residency and recovery requirements are reviewed. OIDC authentication never replaces application authorization.
- Revisit when: A customer requires a different IdP, federation profile or residency/control boundary.
