/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/strv-dashboard',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
