import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Récupération de la vidéo avec ID:', params.id);
    
    const client = await clientPromise;
    const db = client.db('Tetrisnews');
    
    // Récupérer la vidéo par ID
    const video = await db.collection('video').findOne({
      _id: new ObjectId(params.id)
    });
    
    if (!video) {
      console.log('Vidéo non trouvée');
      return NextResponse.json(
        { error: 'Vidéo non trouvée' },
        { status: 404 }
      );
    }
    
    console.log('Vidéo trouvée:', video);
    
    // Formater les données pour la réponse
    const formattedVideo = {
      _id: video._id.toString(),
      Titre: video.Titre || '',
      Description: video.Description || video.description || '',
      Catégorie: video.Catégorie || video.category || '',
      LienVideo: video.LienVideo || video.videoUrl || '',
      secteur: video.secteur || video.sector || '',
      datePublication: video.datePublication || null
    };
    
    console.log('Vidéo formatée:', formattedVideo);
    return NextResponse.json(formattedVideo);
  } catch (error) {
    console.error('Erreur lors de la récupération de la vidéo:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la vidéo', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
