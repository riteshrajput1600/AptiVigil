import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { config as loadDotEnv } from 'dotenv';
import { parseWorkerEnvironment } from '@aptivigil/config';

/** Call once at each future worker process entrypoint, before opening connections. */
export function loadWorkerEnvironment() {
  loadDotEnv({ path: resolve(process.cwd(), '../../.env'), quiet: true });
  return parseWorkerEnvironment();
}

/** Queue handlers should carry this ID into logs and downstream jobs. */
export function getJobCorrelationId(message: { messageId?: string; correlationId?: string }) {
  return message.correlationId || message.messageId || randomUUID();
}

/** Standard entrypoint wrapper: environment validation completes before work starts. */
export async function bootstrapWorker(start: (environment: ReturnType<typeof loadWorkerEnvironment>) => Promise<void>) {
  const environment = loadWorkerEnvironment();
  await start(environment);
}

/** Log only identifiers and operational metadata; message bodies are intentionally absent. */
export function logJobEvent(fields: {
  level: 'info' | 'warn' | 'error';
  event: string;
  queue: string;
  correlationId: string;
  jobId?: string;
  durationMs?: number;
}) {
  process.stdout.write(`${JSON.stringify({ timestamp: new Date().toISOString(), ...fields })}\n`);
}
