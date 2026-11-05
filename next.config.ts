import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old GoDaddy-site URLs that Google still has indexed.
  redirects() {
    return [{ source: "/contact-us", destination: "/contact", permanent: true }];
  },
};

export default nextConfig;
