import { createHash, createHmac } from 'node:crypto';

const endpoint = new URL(process.env.OBJECT_STORAGE_ENDPOINT ?? 'http://localhost:8333');
const bucket = process.env.OBJECT_STORAGE_BUCKET ?? 'aptivigil-local';
const accessKey = process.env.OBJECT_STORAGE_ACCESS_KEY ?? 'aptivigil-local';
const secretKey = process.env.OBJECT_STORAGE_SECRET_KEY ?? 'aptivigil-local-secret';
const region = process.env.OBJECT_STORAGE_REGION ?? 'us-east-1';
const payloadHash = createHash('sha256').update('').digest('hex');

function hmac(key, value) {
  return createHmac('sha256', key).update(value).digest();
}

async function signedRequest(method, pathname) {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const date = timestamp.slice(0, 8);
  const host = endpoint.host;
  const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
  const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${timestamp}\n`;
  const canonicalRequest = `${method}\n${pathname}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
  const scope = `${date}/${region}/s3/aws4_request`;
  const stringToSign = `AWS4-HMAC-SHA256\n${timestamp}\n${scope}\n${createHash('sha256').update(canonicalRequest).digest('hex')}`;
  const dateKey = hmac(`AWS4${secretKey}`, date);
  const regionKey = hmac(dateKey, region);
  const serviceKey = hmac(regionKey, 's3');
  const signingKey = hmac(serviceKey, 'aws4_request');
  const signature = createHmac('sha256', signingKey).update(stringToSign).digest('hex');
  return fetch(new URL(pathname, endpoint), {
    method,
    headers: {
      'x-amz-date': timestamp,
      'x-amz-content-sha256': payloadHash,
      Authorization: `AWS4-HMAC-SHA256 Credential=${accessKey}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    },
  });
}

const path = `/${encodeURIComponent(bucket)}`;
const existing = await signedRequest('HEAD', path);
if (existing.ok) {
  process.stdout.write(`Local S3 bucket ready: ${bucket}\n`);
} else if (existing.status === 404) {
  const created = await signedRequest('PUT', path);
  if (!created.ok) {
    const detail = await created.text();
    process.stderr.write(`Could not create local S3 bucket (${created.status}): ${detail.slice(0, 240)}\n`);
    process.exitCode = 1;
  } else {
    process.stdout.write(`Created local S3 bucket: ${bucket}\n`);
  }
} else {
  const detail = await existing.text();
  process.stderr.write(`Could not check local S3 bucket (${existing.status}): ${detail.slice(0, 240)}\n`);
  process.exitCode = 1;
}
