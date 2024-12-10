export type ProjectStatus = 'en_cours' | 'termine' | 'archive';

export const PROJECT_STATUSES: Record<ProjectStatus, string> = {
  'en_cours': 'En cours',
  'termine': 'Terminé',
  'archive': 'Archivé'
} as const;

export interface ContentType {
  id: string;
  name: string;
  subtypes: ContentSubtype[];
}

export interface ContentSubtype {
  id: string;
  name: string;
  description?: string;
}

export const CONTENT_TYPES: ContentType[] = [
  {
    id: 'blog',
    name: 'Articles de Blog',
    subtypes: [
      { id: '1', name: 'Articles courts', description: '300-500 mots' },
      { id: '2', name: 'Articles moyens', description: '500-1000 mots' },
      { id: '3', name: 'Articles longs', description: '1000+ mots' },
      { id: '4', name: 'Guides pratiques' },
      { id: '5', name: 'Tutoriels' },
      { id: '6', name: 'Études de cas' }
    ]
  },
  {
    id: 'social',
    name: 'Publications sur les Réseaux Sociaux',
    subtypes: [
      { id: '7', name: 'Posts courts (Facebook)' },
      { id: '8', name: 'Posts avec images/vidéos (Facebook)' },
      { id: '9', name: 'Événements (Facebook)' },
      { id: '10', name: 'Légendes pour les images (Instagram)' },
      { id: '11', name: 'Légendes pour les carrousels (Instagram)' },
      { id: '12', name: 'Hashtags pertinents (Instagram)' },
      { id: '13', name: 'Scripts pour Reels/IGTV (Instagram)' },
      { id: '14', name: 'Tweets simples (Twitter)' },
      { id: '15', name: 'Threads (séries de tweets) (Twitter)' },
      { id: '16', name: 'Hashtags tendances (Twitter)' },
      { id: '17', name: 'Posts professionnels (LinkedIn)' },
      { id: '18', name: 'Articles longs (LinkedIn)' },
      { id: '19', name: 'Mises à jour de statut (LinkedIn)' }
    ]
  },
  {
    id: 'email',
    name: 'Emails et Newsletters',
    subtypes: [
      { id: '20', name: 'Emails promotionnels' },
      { id: '21', name: 'Newsletters périodiques' },
      { id: '22', name: 'Emails de bienvenue' },
      { id: '23', name: 'Emails transactionnels' }
    ]
  },
  {
    id: 'web',
    name: 'Pages Web',
    subtypes: [
      { id: '24', name: 'Pages d\'accueil' },
      { id: '25', name: 'Pages "À propos"' },
      { id: '26', name: 'Pages de services/produits' },
      { id: '27', name: 'FAQ' },
      { id: '28', name: 'Landing pages' }
    ]
  },
  {
    id: 'product',
    name: 'Descriptions de Produits',
    subtypes: [
      { id: '29', name: 'Fiches produits pour e-commerce' },
      { id: '30', name: 'Descriptions techniques' },
      { id: '31', name: 'Avantages et caractéristiques clés' }
    ]
  },
  {
    id: 'press',
    name: 'Communiqués de Presse',
    subtypes: [
      { id: '32', name: 'Annonces officielles' },
      { id: '33', name: 'Lancements de produits' },
      { id: '34', name: 'Événements d\'entreprise' }
    ]
  },
  {
    id: 'script',
    name: 'Scripts',
    subtypes: [
      { id: '35', name: 'Scripts vidéo (YouTube, formations)' },
      { id: '36', name: 'Scripts de podcast' },
      { id: '37', name: 'Scripts de webinaires' },
      { id: '38', name: 'Scripts de présentation' }
    ]
  },
  {
    id: 'business',
    name: 'Documents Professionnels',
    subtypes: [
      { id: '39', name: 'Livres blancs' },
      { id: '40', name: 'Études de cas détaillées' },
      { id: '41', name: 'Rapports annuels' },
      { id: '42', name: 'Propositions commerciales' }
    ]
  },
  {
    id: 'ads',
    name: 'Annonces Publicitaires',
    subtypes: [
      { id: '43', name: 'Annonces textuelles (Google Ads)' },
      { id: '44', name: 'Annonces display (Google Ads)' },
      { id: '45', name: 'Textes publicitaires (Facebook Ads)' },
      { id: '46', name: 'Appels à l\'action (Facebook Ads)' },
      { id: '47', name: 'Annonces sponsorisées (LinkedIn Ads)' },
      { id: '48', name: 'Messages InMail (LinkedIn Ads)' }
    ]
  },
  {
    id: 'seo',
    name: 'Contenu SEO Spécifique',
    subtypes: [
      { id: '49', name: 'Méta-titres' },
      { id: '50', name: 'Méta-descriptions' },
      { id: '51', name: 'Balises alt pour les images' },
      { id: '52', name: 'Snippets optimisés' }
    ]
  },
  {
    id: 'legal',
    name: 'Documents Juridiques',
    subtypes: [
      { id: '53', name: 'Termes et conditions' },
      { id: '54', name: 'Politiques de confidentialité' },
      { id: '55', name: 'Mentions légales' }
    ]
  },
  {
    id: 'education',
    name: 'Contenu Éducatif',
    subtypes: [
      { id: '56', name: 'Supports de formation' },
      { id: '57', name: 'Quiz et questionnaires' },
      { id: '58', name: 'Guides d\'étude' }
    ]
  },
  {
    id: 'creative',
    name: 'Contenu Créatif',
    subtypes: [
      { id: '59', name: 'Histoires courtes' },
      { id: '60', name: 'Poèmes' },
      { id: '61', name: 'Scénarios' }
    ]
  },
  {
    id: 'cv',
    name: 'CV et Lettres de Motivation',
    subtypes: [
      { id: '62', name: 'Formats professionnels' },
      { id: '63', name: 'Lettres personnalisées' }
    ]
  },
  {
    id: 'other',
    name: 'Autres',
    subtypes: [
      { id: '64', name: 'Transcriptions d\'audio/vidéo' },
      { id: '65', name: 'Résumés de livres' },
      { id: '66', name: 'Présentations (texte pour slides)' },
      { id: '67', name: 'Plans d\'affaires' }
    ]
  }
];

export interface Project {
  id: string;
  user_id: string;
  titre: string;
  description?: string;
  statut: ProjectStatus;
  types_contenus: {
    type_id: string;
    subtype_ids: string[];
  }[];
  progression: number;
  date_creation: string;
  date_modification: string;
}

export interface CreateProjectData {
  titre: string;
  description?: string;
  statut: ProjectStatus;
  types_contenus: {
    type_id: string;
    subtype_ids: string[];
  }[];
}