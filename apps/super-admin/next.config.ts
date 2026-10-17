import type { NextConfig } from 'next';
const config: NextConfig = {
  basePath: process.env.VERCEL ? '/super-admin' : undefined,
  transpilePackages: ['@aptivigil/ui'],
};
export default config;
