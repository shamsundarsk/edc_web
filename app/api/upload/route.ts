import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    // Debug: Check if Cloudinary is properly configured
    const config = cloudinary.config();
    if (!config.cloud_name || !config.api_key || !config.api_secret) {
      console.error('Cloudinary configuration missing:', {
        cloud_name: !!config.cloud_name,
        api_key: !!config.api_key,
        api_secret: !!config.api_secret
      });
      return NextResponse.json({ 
        success: false, 
        error: "Cloudinary configuration is incomplete" 
      }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determine resource type based on file type
    const isVideo = file.type.startsWith('video/');
    const resourceType = isVideo ? 'video' : 'image';
    
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ 
          folder: "edc-cell",
          resource_type: resourceType,
          // For videos, add additional options
          ...(isVideo && {
            eager: [
              { width: 300, height: 300, crop: "pad", audio_codec: "none" },
              { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }
            ],
            eager_async: true,
          })
        }, (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(buffer);
    });

    return NextResponse.json({ success: true, data: uploadResult });
  } catch (error: any) {
    console.error("Upload failed:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Upload failed" 
    }, { status: 500 });
  }
}
