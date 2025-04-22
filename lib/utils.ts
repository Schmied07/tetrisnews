export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Client-side
    return window.location.origin;
  }
  
  if (process.env.VERCEL_URL) {
    // Production on Vercel
    return `https://${process.env.VERCEL_URL}`;
  }
  
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    // Custom domain in production
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  
  // Default to localhost for development
  return 'http://localhost:3000';
}

export function getApiUrl(path: string) {
  return `${getBaseUrl()}${path}`;
} 