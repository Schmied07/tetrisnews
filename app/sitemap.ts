import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

interface Article {
  _id: string;
  datePublication?: string;
  date?: string;
}

interface PDF {
  _id: string;
  datePublication: string;
}

interface Video {
  _id: string;
  datePublication: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tetrisnews.com';
  
  // Statique URLs de base
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions-pdf`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions-video`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/actualites`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/inscription`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  try {
    // URLs dynamiques depuis la base de données
    const { db } = await connectToDatabase();
    
    // Récupérer les articles/actualités
    const articles = await db.collection('actualites').find({}).sort({ datePublication: -1 }).toArray();
    const articleUrls: MetadataRoute.Sitemap = articles.map((article: Article) => ({
      url: `${baseUrl}/actualites/${article._id}`,
      lastModified: new Date(article.datePublication || article.date || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Récupérer les PDFs
    const pdfs = await db.collection('pdf').find({}).toArray();
    const pdfUrls: MetadataRoute.Sitemap = pdfs.map((pdf: PDF) => ({
      url: `${baseUrl}/solutions-pdf/${pdf._id}`,
      lastModified: new Date(pdf.datePublication || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Récupérer les vidéos
    const videos = await db.collection('videos').find({}).toArray();
    const videoUrls: MetadataRoute.Sitemap = videos.map((video: Video) => ({
      url: `${baseUrl}/solutions-video/${video._id}`,
      lastModified: new Date(video.datePublication || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticUrls, ...articleUrls, ...pdfUrls, ...videoUrls];
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error);
    // Retourner au moins les URLs statiques en cas d'erreur
    return staticUrls;
  }
}