import { z } from 'zod';

const port = z.coerce.number().int().min(1).max(65535);
const base = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url().refine((value) => value.startsWith('postgres'), 'must be a PostgreSQL URL'),
  REDIS_URL: z.string().url().refine((value) => value.startsWith('redis'), 'must be a Redis URL'),
});

export const apiEnvironmentSchema = base.extend({
  API_PORT: port.default(4000),
  WEB_ORIGINS: z.string().default('http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3003,http://localhost:3004,http://localhost:3005,http://localhost:3006,http://localhost:3007').transform((value, context) => {
    const origins = value.split(',').map((origin) => origin.trim());
    const invalid = origins.filter((origin) => !z.string().url().safeParse(origin).success);
    if (!origins.length || invalid.length) context.addIssue({ code: z.ZodIssueCode.custom, message: 'must be a comma-separated list of valid origins' });
    return origins;
  }),
}).transform((value) => ({ ...value, webOrigins: value.WEB_ORIGINS }));

export const workerEnvironmentSchema = base.extend({
  AWS_REGION: z.string().min(1).default('ap-south-1'),
  SQS_ENDPOINT: z.string().url().optional(),
  OBJECT_STORAGE_ENDPOINT: z.string().url().refine((value) => value.startsWith('http://') || value.startsWith('https://'), 'must use HTTP or HTTPS'),
  OBJECT_STORAGE_BUCKET: z.string().min(1),
  OBJECT_STORAGE_ACCESS_KEY: z.string().min(1),
  OBJECT_STORAGE_SECRET_KEY: z.string().min(1),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: port.default(1025),
  SMTP_FROM: z.string().email(),
});

export type ApiEnvironment = z.infer<typeof apiEnvironmentSchema>;
export type WorkerEnvironment = z.infer<typeof workerEnvironmentSchema>;

function parseEnvironment<T extends z.ZodType>(schema: T, env: Record<string, string | undefined> = process.env): z.infer<T> {
  const result = schema.safeParse(env);
  if (!result.success) {
    const details = result.error.issues.map((issue) => `${issue.path.join('.') || 'environment'}: ${issue.message}`).join('; ');
    throw new Error(`Invalid environment configuration: ${details}`);
  }
  return result.data;
}

export function parseApiEnvironment(env?: Record<string, string | undefined>): ApiEnvironment {
  return parseEnvironment(apiEnvironmentSchema, env);
}

export function parseWorkerEnvironment(env?: Record<string, string | undefined>): WorkerEnvironment {
  return parseEnvironment(workerEnvironmentSchema, env);
}
