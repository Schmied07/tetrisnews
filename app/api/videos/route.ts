import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Collection } from 'mongodb';

interface VideoDocument {
  _id: any;
  Titre?: string;
  title?: string;
  name?: string;
  Description?: string;
  description?: string;
  Catégorie?: string;
  category?: string;
  LienVideo?: string;
  videoUrl?: string;
  secteur?: string;
  sector?: string;
  datePublication?: Date;
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const videoCollection = db.collection('video') as Collection<VideoDocument>;
    const videos = await videoCollection
      .find({})
      .sort({ datePublication: -1 })
      .toArray();

    return NextResponse.json(videos.map((video: VideoDocument) => ({
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