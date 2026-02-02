import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Setting from '../../../models/Setting';
import VideoAsset from '../../../models/VideoAsset';

// Synchronized with VIDEO_SOURCES[0] in the component for initial load consistency
const PUBLIC_FALLBACK_URL = "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-lines-in-the-air-40019-large.mp4";

/**
 * GET /api/video-url
 * Resolves the active background video URL from MongoDB hierarchy.
 * Returns a verified CDN fallback if database is unreachable or empty.
 */
export async function GET() {
  try {
    // Attempt database connection with a shorter timeout
    await dbConnect().catch(() => null);
    
    // Priority 1: Global Settings Override (Managed via Admin Panel)
    const config = await Setting.findOne().lean().catch(() => null);
    if (config?.backgroundVideoUrl) {
      return NextResponse.json({ url: config.backgroundVideoUrl });
    }

    // Priority 2: Most recent specifically activated Video Asset
    const activeAsset = await VideoAsset.findOne({ isActive: true })
      .sort({ createdAt: -1 })
      .lean()
      .catch(() => null);
      
    if (activeAsset?.url) {
      return NextResponse.json({ url: activeAsset.url });
    }
    
    return NextResponse.json({ url: PUBLIC_FALLBACK_URL });

  } catch (error) {
    console.warn("API: Video route resolution failed, serving standard CDN fallback.");
    return NextResponse.json({ url: PUBLIC_FALLBACK_URL });
  }
}