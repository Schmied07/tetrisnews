import { Metadata } from 'next';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { notFound } from 'next/navigation';

interface Article {
  title: string;
  content: string;
  publishedAt: string;
  author?: string;
  tags?: string[];
  description?: string;
  excerpt?: string;
}

interface Props {
  params: {
    slug: string;
  };
}

async function getArticleBySlug(slug: string): Promise<Article | null> {
  // TODO: Implémenter la récupération de l'article depuis la base de données
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article non trouvé - TetrisNews',
      description: 'L\'article que vous recherchez n\'existe pas ou a été supprimé.',
    };
  }

  return {
    title: `${article.title} - TetrisNews`,
    description: article.description || article.excerpt || article.content.substring(0, 160),
    keywords: article.tags?.join(', ') || 'actualités, intelligence artificielle, analyse de données',
    openGraph: {
      title: article.title,
      description: article.description || article.excerpt || article.content.substring(0, 160),
      type: 'article',
      locale: 'fr_FR',
      publishedTime: article.publishedAt,
      authors: article.author,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">{article.title}</h1>
          <div className="flex items-center text-sm text-text-light mb-4">
            <time dateTime={article.publishedAt}>
              {format(new Date(article.publishedAt), 'PPP', { locale: fr })}
            </time>
            {article.author && (
              <>
                <span className="mx-2">•</span>
                <span>Par {article.author}</span>
              </>
            )}
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </article>
    </div>
  );
} 