
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import Inquiry from '../../models/Inquiry';

/**
 * API Handler for project inquiries.
 * In a standard Next.js environment, this file lives in pages/api/contact.ts.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await dbConnect();
    
    const { name, email, company, projectDescription } = req.body;
    
    if (!name || !email || !projectDescription) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      company,
      projectDescription,
      status: 'new'
    });

    return res.status(201).json(inquiry);
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
