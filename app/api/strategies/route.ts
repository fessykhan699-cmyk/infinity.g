
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Inquiry from '../../../models/Inquiry';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { industry, goals, strategy } = await request.json();
    
    const newEntry = await Inquiry.create({
      name: 'AI Advisor User',
      email: 'advisor@infinity.internal',
      industry,
      projectDescription: goals,
      generatedStrategy: strategy,
      status: 'strategy_generated'
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const strategies = await Inquiry.find({ status: 'strategy_generated' })
      .sort({ createdAt: -1 })
      .limit(5);
    return NextResponse.json(strategies);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
