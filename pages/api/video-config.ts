import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-lines-in-the-air-40019-large.mp4",
    fallbackUrl: "https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-an-abstract-landscape-of-lines-and-dots-40030-large.mp4",
    opacity: 0.8,
    mixBlendMode: "screen"
  });
}