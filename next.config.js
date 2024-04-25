/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com',   'i.pinimg.com','images.unsplash.com',"flowbite.s3.amazonaws.com/","tecdn.b-cdn.net"],
    
  },
  experimental: {
    serverActions: true
  },
  
}

module.exports = nextConfig
