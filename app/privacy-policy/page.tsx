'use client'

import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Politique de confidentialité de TETRISNEWS</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="mb-6">
          La présente Politique de confidentialité explique comment nous recueillons, utilisons et protégeons vos informations personnelles lorsque vous visitez notre site https://www.tetrisnews.fr (le « Site »). En utilisant notre Site, vous acceptez les pratiques décrites ci-dessous.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Informations que nous collectons</h2>
          
          <h3 className="text-xl font-medium mb-2">1.1 Informations sur l'appareil</h3>
          <p className="mb-4">
            Lorsque vous naviguez sur notre Site, nous collectons automatiquement certaines informations liées à votre appareil, notamment :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>votre adresse IP</li>
            <li>le type et la version de votre navigateur</li>
            <li>votre fuseau horaire</li>
            <li>les pages consultées</li>
            <li>les liens cliqués</li>
            <li>les sources de trafic (site d'origine, mots-clés de recherche, etc.)</li>
            <li>les interactions avec notre Site</li>
          </ul>
          <p>Ces données sont appelées « Informations sur l'appareil ».</p>

          <h3 className="text-xl font-medium mb-2 mt-6">1.2 Technologies de suivi utilisées</h3>
          <p className="mb-4">Nous utilisons différentes technologies pour collecter ces données :</p>
          <ul className="list-disc pl-6">
            <li>Cookies : petits fichiers texte placés sur votre appareil pour mémoriser vos préférences et améliorer votre expérience utilisateur.</li>
            <li>Fichiers journaux (logs) : capturent les actions sur le site (adresses IP, pages visitées, etc.).</li>
            <li>Balises web / pixels invisibles : nous aident à comprendre la navigation et les comportements des visiteurs.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Utilisation des informations collectées</h2>
          <p className="mb-4">Nous utilisons vos données pour :</p>
          <ul className="list-disc pl-6">
            <li>améliorer la navigation et le contenu proposé sur le Site</li>
            <li>personnaliser nos services selon vos préférences</li>
            <li>analyser la performance du Site et le comportement utilisateur</li>
            <li>proposer de nouveaux services en fonction de vos centres d'intérêt</li>
            <li>détecter et prévenir les fraudes et activités malveillantes</li>
            <li>communiquer avec vous si vous nous contactez</li>
          </ul>
          <p className="mt-4">
            Nous n'effectuons aucune vente directe sur le site, donc aucune donnée de commande n'est collectée (pas d'informations bancaires ou d'expédition).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Consentement et préférences</h2>
          <p>
            En visitant notre Site, vous consentez à l'utilisation des cookies et au traitement de vos données tel que décrit. Vous pouvez gérer ou désactiver les cookies via les paramètres de votre navigateur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Partage de vos données</h2>
          <p className="mb-4">
            Nous ne vendons jamais vos données personnelles. Toutefois, nous pouvons les partager avec des partenaires techniques (outils d'analyse, hébergeurs, prestataires de sécurité) uniquement dans les cas suivants :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>pour améliorer nos services et analyses</li>
            <li>pour garantir la sécurité du Site</li>
            <li>dans le cadre d'obligations légales ou réglementaires</li>
          </ul>
          <p className="font-medium">Exemples de services tiers utilisés :</p>
          <ul className="list-disc pl-6">
            <li>Google Analytics (analyse de trafic)</li>
            <li>OVH (hébergement)</li>
            <li>Outils de suivi de performance</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Conservation des données</h2>
          <p>
            Vos données sont conservées aussi longtemps que nécessaire aux fins décrites dans cette politique, sauf obligation légale contraire.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Sécurité</h2>
          <p>
            Nous mettons en place des mesures de sécurité (cryptage, pare-feu, surveillance) pour protéger vos informations personnelles contre l'accès non autorisé.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Vos droits</h2>
          <p className="mb-4">
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>droit d'accès à vos données</li>
            <li>droit de rectification ou suppression</li>
            <li>droit d'opposition ou de limitation</li>
            <li>droit à la portabilité</li>
          </ul>
          <p>
            Pour exercer ces droits ou poser une question, contactez-nous à contact@tetrisnews.fr.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Modifications</h2>
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité à tout moment. La dernière mise à jour date du 16 avril 2025.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
          <p>
            Pour toute question relative à cette politique, vous pouvez nous contacter par e-mail à contact@tetrisnews.fr.
          </p>
        </section>
      </div>
    </motion.div>
  )
} 