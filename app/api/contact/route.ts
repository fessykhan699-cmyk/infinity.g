import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Inquiry from '../../../models/Inquiry';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, company, industry, projectDescription, generatedStrategy } = body;

    if (!name || !email || !projectDescription) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      company,
      industry,
      projectDescription,
      generatedStrategy,
      status: generatedStrategy ? 'strategy_generated' : 'new'
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}