import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const youtube = google.youtube('v3');

export async function POST(request: Request) {
  try {
    const { youtubeUsername, email, solutionId } = await request.json();
    console.log('Données reçues:', { youtubeUsername, email, solutionId });

    if (!youtubeUsername) {
      console.log('Nom d\'utilisateur YouTube manquant');
      return NextResponse.json(
        { error: 'Le nom d\'utilisateur YouTube est requis' },
        { status: 400 }
      );
    }

    // Votre clé API YouTube
    const API_KEY = process.env.YOUTUBE_API_KEY;
    // L'ID de votre chaîne YouTube
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

    console.log('Configuration YouTube:', { API_KEY: !!API_KEY, CHANNEL_ID });

    if (!API_KEY || !CHANNEL_ID) {
      console.error('Configuration YouTube manquante:', { API_KEY: !!API_KEY, CHANNEL_ID: !!CHANNEL_ID });
      throw new Error('YouTube API configuration is missing');
    }

    // 1. Récupérer l'ID de la chaîne de l'utilisateur à partir de son nom d'utilisateur
    console.log('Recherche de la chaîne YouTube:', youtubeUsername);
    const channelResponse = await youtube.search.list({
      key: API_KEY,
      part: ['snippet'],
      q: youtubeUsername,
      type: ['channel'],
      maxResults: 1
    });

    console.log('Résultat de la recherche:', channelResponse.data);

    if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
      console.log('Aucune chaîne trouvée pour:', youtubeUsername);
      return NextResponse.json(
        { error: 'Chaîne YouTube non trouvée' },
        { status: 404 }
      );
    }

    const userChannelId = channelResponse.data.items[0].id?.channelId;
    console.log('ID de chaîne trouvé:', userChannelId);

    if (!userChannelId) {
      console.log('ID de chaîne non trouvé dans la réponse');
      return NextResponse.json(
        { error: 'ID de chaîne non trouvé' },
        { status: 404 }
      );
    }

    // 2. Vérifier les abonnements de l'utilisateur
    console.log('Vérification des abonnements de l\'utilisateur:', userChannelId);
    const subscriptionsResponse = await youtube.subscriptions.list({
      key: API_KEY,
      part: ['snippet'],
      channelId: userChannelId,
      maxResults: 50
    });

    console.log('Résultat de la vérification des abonnements:', subscriptionsResponse.data);

    // Vérifier si l'utilisateur est abonné à votre chaîne
    const isSubscribed = subscriptionsResponse.data.items?.some(
      item => item.snippet?.resourceId?.channelId === CHANNEL_ID
    );

    if (isSubscribed) {
      console.log('Abonnement confirmé pour:', youtubeUsername);
      
      // Si l'email est fourni, l'enregistrer dans la base de données
      if (email) {
        const { db } = await connectToDatabase();
        await db.collection('subscriptions').insertOne({
          email,
          youtubeUsername,
          youtubeChannelId: userChannelId,
          solutionId,
          date: new Date()
        });
      }

      return NextResponse.json({ isSubscribed: true });
    } else {
      console.log('Abonnement non trouvé pour:', youtubeUsername);
      return NextResponse.json(
        { error: 'Vous n\'êtes pas abonné à notre chaîne YouTube' },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error('Error checking YouTube subscription:', error);
    return NextResponse.json(
      { error: 'Failed to check subscription' },
      { status: 500 }
    );
  }
} 