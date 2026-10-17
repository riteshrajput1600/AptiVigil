'use client';

import { useState, type FormEvent } from 'react';

const portalUrls: Record<string, string> = {
  student: process.env.NEXT_PUBLIC_STUDENT_PORTAL_URL ?? 'http://localhost:3000',
  'organization-admin': process.env.NEXT_PUBLIC_ORGANIZATION_ADMIN_PORTAL_URL ?? 'http://localhost:3001',
  'exam-manager': process.env.NEXT_PUBLIC_EXAM_MANAGER_PORTAL_URL ?? 'http://localhost:3002',
  proctor: process.env.NEXT_PUBLIC_PROCTOR_PORTAL_URL ?? 'http://localhost:3003',
  reviewer: process.env.NEXT_PUBLIC_REVIEWER_PORTAL_URL ?? 'http://localhost:3004',
  'support-admin': process.env.NEXT_PUBLIC_SUPPORT_ADMIN_PORTAL_URL ?? 'http://localhost:3005',
  'super-admin': process.env.NEXT_PUBLIC_SUPER_ADMIN_PORTAL_URL ?? 'http://localhost:3006',
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          loginId: String(form.get('loginId') ?? '').trim(),
          password: String(form.get('password') ?? ''),
        }),
      });

      if (response.status === 401) {
        setError('The ID or password was not recognized. Check your details and try again.');
        return;
      }
      if (response.status === 404) {
        setError('Secure sign-in is not connected yet. Please contact your organization administrator.');
        return;
      }
      if (!response.ok) {
        setError('We could not sign you in right now. Please try again or contact your administrator.');
        return;
      }

      const result: { role?: string } = await response.json();
      const portalUrl = result.role ? portalUrls[result.role] : undefined;
      if (!portalUrl) {
        setError('Your account has no active portal role. Contact your organization administrator.');
        return;
      }
      window.location.assign(portalUrl);
    } catch {
      setError('The sign-in service is unavailable. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <label htmlFor="login-id">User ID or email</label>
      <input autoComplete="username" autoCapitalize="none" id="login-id" name="loginId" placeholder="Enter your ID or work email" required />
      <label htmlFor="login-password">Password</label>
      <input autoComplete="current-password" id="login-password" name="password" placeholder="Enter your password" required type="password" />
      {error ? <p className="loginError" aria-live="polite">{error}</p> : null}
      <button className="button loginButton" disabled={loading} type="submit">
        {loading ? 'Logging in…' : 'Log in'} <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
