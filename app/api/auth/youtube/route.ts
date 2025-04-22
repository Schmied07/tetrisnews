import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { connectToDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic'; // Force le rendu dynamique

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/youtube/callback`
);

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const { solutionId } = JSON.parse(state || '{}');

    if (!code) {
      throw new Error('Code d\'autorisation manquant');
    }

    // Échanger le code contre un token d'accès
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Créer une instance de l'API YouTube
    const youtube = google.youtube('v3');

    // Récupérer les informations de l'utilisateur
    const userInfo = await youtube.channels.list({
      auth: oauth2Client,
      part: ['snippet', 'statistics'],
      mine: true
    });

    const channel = userInfo.data.items?.[0];
    if (!channel) {
      throw new Error('Impossible de récupérer les informations de la chaîne');
    }

    // Vérifier les abonnements
    const subscriptions = await youtube.subscriptions.list({
      auth: oauth2Client,
      part: ['snippet'],
      mine: true,
      maxResults: 50
    });

    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
    const isSubscribed = subscriptions.data.items?.some(
      item => item.snippet?.resourceId?.channelId === CHANNEL_ID
    );

    if (isSubscribed) {
      // Enregistrer les informations dans la base de données
      const { db } = await connectToDatabase();
      await db.collection('subscriptions').insertOne({
        email: channel.snippet?.customUrl || channel.snippet?.title,
        youtubeUsername: channel.snippet?.title,
        youtubeChannelId: channel.id,
        solutionId,
        date: new Date()
      });

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/solutions-pdf?success=true`);
    } else {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/solutions-pdf?error=not_subscribed`);
    }
  } catch (error) {
    console.error('Erreur lors de l\'authentification YouTube:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/solutions-pdf?error=auth_failed`);
  }
} 