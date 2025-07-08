import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.gamatecha.space',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
