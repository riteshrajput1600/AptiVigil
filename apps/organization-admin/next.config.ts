import type { NextConfig } from 'next';
const config: NextConfig = {
  basePath: process.env.VERCEL ? '/organization-admin' : undefined,
  transpilePackages: ['@aptivigil/ui'],
};
export default config;
