import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Début de la requête GET /api/actualites');
    console.log('Connexion à la base de données...');
    
    const { db } = await connectToDatabase();
    console.log('Base de données connectée');

    // Vérification des collections disponibles
    const collections = await db.listCollections().toArray();
    console.log('Collections disponibles:', collections.map((col: { name: string }) => col.name));
    
    // Vérification si la collection existe
    const collectionExists = collections.some((col: { name: string }) => col.name === 'actualiteTech');
    console.log('Collection actualiteTech existe:', collectionExists);
    
    if (!collectionExists) {
      console.log('La collection actualiteTech n\'existe pas');
      return NextResponse.json([]);
    }
    
    console.log('Récupération des articles depuis la collection actualiteTech...');
    const actualites = await db.collection('actualiteTech')
      .find({})
      .sort({ datePublication: -1 })
      .toArray();
    
    console.log('Nombre d\'articles trouvés:', actualites.length);
    console.log('Articles bruts:', actualites);

    if (actualites.length === 0) {
      console.log('Aucun article trouvé dans la collection');
      return NextResponse.json([]);
    }

    const formattedArticles = actualites.map((article: {
      _id: any;
      Titre: string;
      resume: string;
      articleComplet: string;
      Catégorie: string;
      secteur: string;
      datePublication: string;
      imageUrl: string;
      auteur: string;
      tags: string[];
    }) => ({
      _id: article._id.toString(),
      Titre: article.Titre,
      resume: article.resume,
      articleComplet: article.articleComplet,
      Catégorie: article.Catégorie,
      secteur: article.secteur,
      datePublication: article.datePublication,
      imageUrl: article.imageUrl,
      auteur: article.auteur,
      tags: article.tags
    }));

    console.log('Articles formatés:', formattedArticles);
    return NextResponse.json(formattedArticles);
  } catch (error) {
    console.error('Erreur détaillée:', error);
    if (error instanceof Error) {
      console.error('Message d\'erreur:', error.message);
      console.error('Stack trace:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to fetch actualites', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 