/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    appName: 'SW Wiki',
    author: 'dmitri.frolof@gmail.com',
  },
  images: {
    domains: ['loremflickr.com'],
  },
};

module.exports = nextConfig;
