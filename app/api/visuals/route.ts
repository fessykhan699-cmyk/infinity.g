import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Visual from '../../../models/Visual';

export async function GET() {
  try {
    await dbConnect();
    const visuals = await Visual.find({}).sort({ createdAt: -1 }).limit(12);
    return NextResponse.json(visuals);
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to fetch visuals', error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { prompt, aspectRatio, imageData } = await request.json();

    if (!prompt || !imageData) {
      return NextResponse.json({ message: 'Missing required visual data' }, { status: 400 });
    }

    const visual = await Visual.create({
      prompt,
      aspectRatio,
      imageData,
    });

    return NextResponse.json(visual, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}