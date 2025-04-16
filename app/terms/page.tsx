'use client'

import { motion } from 'framer-motion'

export default function Terms() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Conditions d'utilisation de TETRISNEWS</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">APERÇU</h2>
          <p className="mb-4">
            Ce site web est exploité par TETRISNEWS. Partout sur le site, nous employons les termes « nous », « notre » et « nos » en référence à TETRISNEWS. Ce site web, y compris l'ensemble des informations, outils et services auquel il donne accès, est offert par TETRISNEWS à l'utilisateur que vous êtes, à condition que vous acceptiez la totalité des modalités, conditions, politiques et avis stipulés ici.
          </p>
          <p className="mb-4">
            En visitant notre site et/ou en achetant quelque chose auprès de notre entreprise, vous prenez part à notre « Service » et acceptez d'être lié(e) par les modalités et conditions suivantes (« Conditions générales », « Conditions d'utilisation »), y compris par les modalités, conditions et politiques mentionnées aux présentes et/ou accessibles en hyperlien. Les présentes Conditions d'utilisation s'appliquent à tous les utilisateurs du site, y compris, sans s'y limiter, aux individus qui sont des visiteurs, des fournisseurs, des clients, des marchands et/ou des fournisseurs de contenu.
          </p>
          <p className="mb-4">
            Veuillez lire attentivement les présentes Conditions d'utilisation avant d'accéder à notre site web et de l'utiliser. En accédant à une quelconque partie du site ou en l'utilisant, vous acceptez d'être lié(e) par les présentes Conditions d'utilisation. Si vous n'acceptez pas la totalité des modalités et conditions du présent accord, vous ne pourrez peut-être pas accéder au site web ou utiliser ses services. Si les présentes Conditions d'utilisation sont considérées comme une offre, leur acceptation se limite expressément à elles.
          </p>
          <p>
            Chacun des nouveaux outils ou fonctionnalités qui sont ajoutés à la présente boutique est également assujetti aux Conditions d'utilisation. Vous pouvez consulter la version la plus récente des Conditions d'utilisation à tout moment sur cette page. Nous nous réservons le droit de mettre à jour, modifier ou remplacer n'importe quelle partie des présentes Conditions d'utilisation en publiant lesdites mises à jour et/ou modifications sur notre site web. Il vous incombe de vérifier cette page de temps à autre pour voir si des changements y ont été apportés. En continuant à accéder au site web ou à l'utiliser après la publication des modifications, vous acceptez celles-ci.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">SECTION 1 – CONDITIONS D'UTILISATION DE LA BOUTIQUE EN LIGNE</h2>
          <p className="mb-4">
            En acceptant les présentes Conditions d'utilisation, vous déclarez avoir atteint ou dépassé l'âge de la majorité dans votre région, province ou État et nous avoir donné l'autorisation de permettre à toute personne mineure à votre charge d'utiliser ce site.
          </p>
          <p className="mb-4">
            Vous ne devez en aucune façon utiliser nos produits à des fins illégales ou non autorisées, ni violer des lois de votre juridiction lorsque vous utilisez le Service (y compris, sans toutefois s'y limiter, les lois relatives aux droits d'auteur).
          </p>
          <p className="mb-4">
            Vous ne devez pas transmettre de vers informatiques, de virus ou tout code de nature destructrice.
          </p>
          <p>
            Une infraction ou une violation de n'importe laquelle des Conditions entraînera la résiliation immédiate de vos Services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">SECTION 2 – CONDITIONS GÉNÉRALES</h2>
          <p className="mb-4">
            Nous nous réservons le droit de refuser de servir quelqu'un à tout moment et pour quelque raison que ce soit.
          </p>
          <p className="mb-4">
            Vous comprenez que votre contenu (à l'exception des informations relatives à votre carte de crédit) peut être transféré sans chiffrement et que cela comprend :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>des transmissions sur plusieurs réseaux ; et</li>
            <li>des changements effectués dans le but de se conformer et de s'adapter aux exigences techniques de la connexion de réseaux ou d'appareils.</li>
          </ul>
          <p className="mb-4">
            Les informations de votre carte de crédit sont toujours chiffrées lors de leur transfert sur les réseaux.
          </p>
          <p className="mb-4">
            Vous acceptez de ne pas reproduire, dupliquer, copier, vendre, revendre ou exploiter toute partie du Service, toute utilisation du Service ou tout accès au Service, ou encore tout contact sur le site web à travers lequel le Service est fourni, sans notre autorisation écrite expresse.
          </p>
          <p>
            Les titres utilisés dans le présent accord sont inclus à titre indicatif uniquement et ne limiteront ni n'affecteront aucunement ces Conditions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">SECTION 3 – EXACTITUDE, EXHAUSTIVITÉ ET ACTUALITÉ DES INFORMATIONS</h2>
          <p className="mb-4">
            Nous ne saurions être tenus responsables si les informations proposées sur ce site sont inexactes, incomplètes ou caduques. Le contenu de ce site est fourni à titre d'information générale uniquement et ne doit pas être considéré ou utilisé comme seule base pour la prise de décisions sans consulter des sources d'information plus importantes, plus exactes, plus complètes ou plus actuelles. Si vous vous fiez au contenu de ce site, vous le faites à vos propres risques.
          </p>
          <p>
            Ce site peut contenir certaines données historiques. Par définition, les données historiques ne sont pas actuelles et sont fournies uniquement à titre de référence. Nous nous réservons le droit de modifier les contenus de ce site à tout moment, mais nous n'avons aucune obligation de mettre à jour les informations qu'il contient, quelles qu'elles soient.
          </p>
        </section>
      </div>
    </motion.div>
  )
} 