import type { NextConfig } from 'next';
const config: NextConfig = {
  basePath: process.env.VERCEL ? '/proctor' : undefined,
  transpilePackages: ['@aptivigil/ui'],
};
export default config;
