
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import Inquiry from '../../models/Inquiry';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { industry, goals, strategy } = req.body;
      
      // We save these as 'anonymous' inquiries with strategies attached
      const newEntry = await Inquiry.create({
        name: 'AI Advisor User',
        email: 'advisor@infinity.internal',
        industry,
        projectDescription: goals,
        generatedStrategy: strategy,
        status: 'strategy_generated'
      });

      return res.status(201).json(newEntry);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const strategies = await Inquiry.find({ status: 'strategy_generated' })
        .sort({ createdAt: -1 })
        .limit(5);
      return res.status(200).json(strategies);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
