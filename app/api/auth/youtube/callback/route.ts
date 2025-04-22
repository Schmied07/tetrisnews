import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { connectToDatabase } from '@/lib/mongodb';
import { getBaseUrl } from '@/lib/utils';

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://tetrisnews.fr/api/auth/youtube/callback'
);

// Vérification de l'abonnement
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    
    if (!code || !state) {
      return NextResponse.redirect(new URL('/solutions-pdf?error=missing_params', request.url));
    }

    const { email, name, solutionId } = JSON.parse(state);

    if (!email || !name || !solutionId) {
      return NextResponse.redirect(new URL('/solutions-pdf?error=invalid_state', request.url));
    }

    // Échanger le code contre un token d'accès
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Créer une instance de l'API YouTube
    const youtube = google.youtube('v3');

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
      // Récupérer les informations du PDF
      const { db } = await connectToDatabase();
      const solution = await db.collection('pdf').findOne({ _id: solutionId });

      if (!solution) {
        return NextResponse.redirect(new URL('/solutions-pdf?error=solution_not_found', request.url));
      }

      // Envoyer les données au webhook n8n
      const subscriptionData = {
        email,
        name,
        solutionId,
        solutionTitle: solution.Titre,
        solutionDescription: solution.description,
        solutionUrl: solution.imageUrl,
        condition: solution.condition,
        type: solution.type,
        datePublication: solution.datePublication,
        status: 'pending',
        date: new Date(),
        nom_pdf: solution.nom_pdf || ''
      };

      try {
        await fetch('https://tetrisnews.app.n8n.cloud/webhook/90a92305-7fc3-4e21-a5f1-626036e0abe0', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscriptionData)
        });
      } catch (error) {
        console.error('Erreur lors de l\'envoi au webhook n8n:', error);
        // On continue même si l'envoi au webhook échoue
      }

      // Rediriger vers la page de succès avec le paramètre subscribed
      return NextResponse.redirect(new URL('/auth/youtube/callback/success?subscribed=true', request.url));
    } else {
      // Rediriger vers la page de succès avec le paramètre subscribed=false
      return NextResponse.redirect(new URL('/auth/youtube/callback/success?subscribed=false', request.url));
    }
  } catch (error) {
    console.error('Erreur lors de l\'authentification YouTube:', error);
    return NextResponse.redirect(new URL('/solutions-pdf?error=auth_failed', request.url));
  }
}

// Enregistrement de l'email
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      throw new Error('Email manquant');
    }

    // Enregistrer l'email dans la base de données
    const { db } = await connectToDatabase();
    await db.collection('subscriptions').insertOne({
      email,
      date: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'email:', error);
    return NextResponse.json(
      { error: 'Failed to save email' },
      { status: 500 }
    );
  }
} 