import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Setting from '../../../models/Setting';
import VideoAsset from '../../../models/VideoAsset';
import { v2 as cloudinary } from 'cloudinary';
// Fix: Explicitly import Buffer to resolve "Cannot find name 'Buffer'" errors. 
// In some environments, the Node.js Buffer global is not automatically available to TypeScript.
import { Buffer } from 'buffer';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a buffer to Cloudinary using a promise-wrapped stream.
 */
// Fix: Use the imported Buffer type for the parameter
const uploadToCloudinary = (buffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'video', folder: 'backgrounds' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const formData = await request.formData();
    const file = formData.get('video') as File;
    
    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No valid video file provided' }, { status: 400 });
    }

    // Security: Validate file type & size (15MB limit)
    const MAX_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Video too large (max 15MB)' }, { status: 400 });
    }
    if (!file.type.startsWith('video/')) {
      return NextResponse.json({ error: 'Invalid file type. Please upload an MP4 video.' }, { status: 400 });
    }

    // Convert file to Buffer for Cloudinary stream
    const arrayBuffer = await file.arrayBuffer();
    // Fix: Use Buffer.from on the imported Buffer class to create a buffer from the ArrayBuffer
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(buffer);

    // 1. Log the asset in the registry
    await VideoAsset.updateMany({ isActive: true }, { isActive: false });
    const newAsset = await VideoAsset.create({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      isActive: true,
    });

    // 2. Sync to Global Settings for instant UI propagation
    let setting = await Setting.findOne();
    if (!setting) setting = new Setting();
    setting.backgroundVideoUrl = uploadResult.secure_url;
    setting.updatedAt = new Date();
    await setting.save();

    return NextResponse.json({ 
      url: uploadResult.secure_url,
      message: 'Experience background updated successfully',
      assetId: newAsset._id
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
  }
}