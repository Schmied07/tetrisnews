import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Début de la requête GET /api/solutions-pdf');
    console.log('Connexion à la base de données...');
    
    const { db } = await connectToDatabase();
    console.log('Base de données connectée');

    // Vérification des collections disponibles
    const collections = await db.listCollections().toArray();
    console.log('Collections disponibles:', collections.map((col: { name: string }) => col.name));
    
    // Vérification si la collection existe
    const collectionExists = collections.some((col: { name: string }) => col.name === 'pdf');
    console.log('Collection pdf existe:', collectionExists);
    
    if (!collectionExists) {
      console.log('La collection pdf n\'existe pas');
      return NextResponse.json([]);
    }
    
    console.log('Récupération des solutions depuis la collection pdf...');
    const solutions = await db.collection('pdf')
      .find({})
      .sort({ datePublication: -1 })
      .toArray();
    
    console.log('Nombre de solutions trouvées:', solutions.length);

    if (solutions.length === 0) {
      console.log('Aucune solution trouvée dans la collection');
      return NextResponse.json([]);
    }

    const formattedSolutions = solutions.map((solution: any) => ({
      _id: solution._id.toString(),
      Titre: solution.Titre || '',
      description: solution.description || '',
      imageUrl: solution.imageUrl || '',
      condition: solution.condition || '',
      type: solution.type || '',
      datePublication: solution.datePublication || null,
      nom_pdf: solution.nom_pdf || ''
    }));

    console.log('Solutions formatées:', formattedSolutions);
    return NextResponse.json(formattedSolutions);
  } catch (error) {
    console.error('Erreur détaillée:', error);
    if (error instanceof Error) {
      console.error('Message d\'erreur:', error.message);
      console.error('Stack trace:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to fetch solutions', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 