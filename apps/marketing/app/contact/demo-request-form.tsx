'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Field, SelectField, TextareaField } from '@aptivigil/ui';

export function DemoRequestForm({ salesEmail }: { salesEmail: string }) {
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lines = [
      `Name: ${form.get('name')}`,
      `Work email: ${form.get('email')}`,
      `Organization: ${form.get('organization')}`,
      `Assessment needs: ${form.get('needs')}`,
      '',
      String(form.get('message') ?? ''),
    ];
    const subject = encodeURIComponent(`AptiVigil demo request — ${form.get('organization')}`);
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:${salesEmail}?subject=${subject}&body=${body}`;
    setMessage('Your email app should open with the request ready to send. The website does not store this information.');
  }

  return (
    <form className="demoForm" onSubmit={handleSubmit}>
      <div className="formGrid">
        <Field autoComplete="name" label="Your name" name="name" required />
        <Field autoComplete="email" label="Work email" name="email" required type="email" />
        <Field autoComplete="organization" label="School or organization" name="organization" required />
        <SelectField label="What are you assessing?" defaultValue="" name="needs" required><option disabled value="">Choose one</option><option>School or entrance exams</option><option>University assessments</option><option>Professional certification</option><option>Coding assessments</option><option>Other</option></SelectField>
      </div>
      <TextareaField label="What would you like to discuss?" name="message" rows={5} placeholder="Share the exam workflow or requirements you want to explore." />
      <button className="button" type="submit">Prepare demo request <span>↗</span></button>
      {message ? <p aria-live="polite" className="formMessage">{message}</p> : null}
      <small>We only use the details in your email to respond to your inquiry. Do not include candidate data or sensitive exam content.</small>
    </form>
  );
}
