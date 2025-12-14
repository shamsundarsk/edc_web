 import { v2 as cloudinary } from "cloudinary";
 
 // Use NEXT_PUBLIC_* because the .env provided uses these names
 // This code runs on the server (API routes), so it's safe enough for now
 cloudinary.config({
   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
 });
 
 export default cloudinary;
