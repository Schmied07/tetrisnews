import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function GET() {
  try {
    console.log('Début de la requête GET /api/solutions');
    console.log('Connexion à la base de données...');
    
    const client = await clientPromise;
    const db = client.db('Tetrisnews');
    console.log('Base de données connectée');

    // Vérification des collections disponibles
    const collections = await db.listCollections().toArray();
    console.log('Collections disponibles:', collections.map(col => col.name));
    
    // Vérification si la collection existe
    const collectionExists = collections.some(col => col.name === 'video');
    console.log('Collection video existe:', collectionExists);
    
    if (!collectionExists) {
      console.log('La collection video n\'existe pas');
      return NextResponse.json([]);
    }
    
    console.log('Récupération des solutions depuis la collection video...');
    const solutions = await db.collection('video').find({}).toArray();
    console.log('Nombre de solutions trouvées:', solutions.length);
    console.log('Structure des documents:', solutions[0]);

    if (solutions.length === 0) {
      console.log('Aucune solution trouvée dans la collection');
      return NextResponse.json([]);
    }

    // Formater les données pour la réponse
    const formattedSolutions = solutions.map(solution => {
      console.log('Document brut:', solution);
      return {
        _id: solution._id.toString(),
        Titre: solution.Titre || solution.title || solution.name || '',
        description: solution.description || solution.Description || '',
        imageUrl: solution.imageUrl || '',
        videoUrl: solution.videoUrl || solution.LienVideo || '',
        datePublication: solution.datePublication || null,
        secteur: solution.secteur || solution.sector || '',
        Catégorie: solution.Catégorie || solution.category || ''
      };
    });

    console.log('Solutions formatées:', formattedSolutions);
    return NextResponse.json(formattedSolutions);
  } catch (error) {
    console.error('Erreur détaillée:', error);
    if (error instanceof Error) {
      console.error('Message d\'erreur:', error.message);
      console.error('Stack trace:', error.stack);
    }
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des solutions', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db('tetrisnews');

    // Vérifier si la collection existe
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === 'solutions');

    if (!collectionExists) {
      // Créer la collection avec un document vide
      await db.collection('solutions').insertOne({
        Titre: 'Exemple de solution',
        description: 'Description de la solution',
        imageUrl: 'https://example.com/image.jpg',
        videoUrl: 'https://www.youtube.com/embed/example',
        datePublication: new Date()
      });
    }

    return NextResponse.json({ message: 'Collection solutions créée ou déjà existante' });
  } catch (error) {
    console.error('Erreur lors de la création de la collection:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la collection' },
      { status: 500 }
    );
  }
} 