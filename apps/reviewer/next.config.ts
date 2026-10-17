import type { NextConfig } from 'next';
const config: NextConfig = {
  basePath: process.env.VERCEL ? '/reviewer' : undefined,
  transpilePackages: ['@aptivigil/ui'],
};
export default config;
