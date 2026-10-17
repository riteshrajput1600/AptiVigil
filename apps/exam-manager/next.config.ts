import type { NextConfig } from 'next';
const config: NextConfig = {
  basePath: process.env.VERCEL ? '/exam-manager' : undefined,
  transpilePackages: ['@aptivigil/ui'],
};
export default config;
