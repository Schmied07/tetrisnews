'use client';

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">Inscription à l'offre spéciale</h1>
          <p className="text-lg text-gray-600">
            Remplissez le formulaire ci-dessous pour profiter de notre offre spéciale
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLScw4czl27Pqsrjd7UGpF2qYWiwtjVKN8RWWx33SYr5W49SvKg/viewform?embedded=true" 
            width="100%" 
            height="1226" 
            frameBorder="0" 
            marginHeight="0" 
            marginWidth="0"
            className="w-full"
          >
            Chargement…
          </iframe>
        </div>
      </div>
    </div>
  );
} 