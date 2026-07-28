import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 para imágenes grandes de campaña/hero; 75 para el resto
    qualities: [75, 90],
  },
};

export default nextConfig;
