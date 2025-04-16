import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const videos = await db.collection('video')
      .find({})
      .sort({ datePublication: -1 })
      .toArray();

    return NextResponse.json(videos.map(video => ({
      id: video._id.toString(),
      Titre: video.Titre || video.title || video.name,
      Description: video.Description || video.description,
      Catégorie: video.Catégorie || video.category,
      LienVideo: video.LienVideo || video.videoUrl,
      secteur: video.secteur || video.sector
    })));
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
} 