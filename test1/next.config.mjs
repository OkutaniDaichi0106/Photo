/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['khbecgwvsbdguigjapru.supabase.co'], // Add your Supabase domain here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;


