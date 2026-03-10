/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow Next.js Image Optimization to serve both full-quality and compressed variants
    images: {
        qualities: [100, 75],
    }
};

export default nextConfig;
