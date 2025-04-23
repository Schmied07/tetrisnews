import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('Requête reçue dans /api/n8n');
    const body = await request.json();
    console.log('Corps de la requête reçu:', body);
    
    // Formater les données pour n8n
    const n8nData = {
      data: body
    };
    
    console.log('Données formatées pour n8n:', n8nData);
    
    console.log('Envoi à n8n...');
    const response = await fetch('https://tetrisnews.app.n8n.cloud/webhook/90a92305-7fc3-4e21-a5f1-626036e0abe0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(n8nData)
    });

    console.log('Statut de la réponse n8n:', response.status);
    const data = await response.json();
    console.log('Réponse de n8n:', data);
    
    return NextResponse.json({ 
      status: response.status,
      data: data,
      nom_pdf: body.nom_pdf // Renvoyer le nom_pdf de la base de données
    });
  } catch (error) {
    console.error('Erreur détaillée lors de l\'envoi à n8n:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de l\'envoi des données',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 