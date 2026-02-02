import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * API handler to fetch the optimized background video URL.
 * Standardized to resilient Mixkit CDN.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const PUBLIC_FALLBACK_URL = "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-lines-in-the-air-40019-large.mp4";
  
  res.status(200).json({ 
    url: PUBLIC_FALLBACK_URL,
    fallback: PUBLIC_FALLBACK_URL 
  });
}