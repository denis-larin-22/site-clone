/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'www.pro-of.com.ua',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'piramidspace.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;
