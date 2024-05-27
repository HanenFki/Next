/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        API_URL : "http://localhost:3001/api",
        SECRET : "secret"
        },
    
            images: {
                domains: ["media.routard.com", "res.cloudinary.com"]
            }
};

export default nextConfig;
