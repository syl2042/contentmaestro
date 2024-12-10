export interface Contenu {
  id: string;
  id_profil_redacteur: string;
  projet_id?: string;
  auteur_id?: string;
  titre: string;
  description?: string;
  type_contenu?: 'texte' | 'audio' | 'image';
  categorie: ContentCategory;
  format?: string;
  statut: ContentStatus;
  contenu_texte?: string;
  contenu_audio?: string;
  contenu_image?: string;
  langue: string;
  visibilite: 'prive' | 'public';
  version: number;
  nombre_mots?: number;
  nombre_caracteres?: number;
  tags?: string[];
  seo_meta_titre?: string;
  seo_meta_description?: string;
  seo_mots_cles?: string[];
  score_seo?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  date_creation: string;
  date_modification: string;
}

export type ContentCategory =
  | 'Articles de Blog'
  | 'Publications sur les Réseaux Sociaux'
  | 'Emails et Newsletters'
  | 'Pages Web'
  | 'Descriptions de Produits'
  | 'Communiqués de Presse'
  | 'Scripts'
  | 'Documents Professionnels'
  | 'Annonces Publicitaires'
  | 'Contenu SEO Spécifique'
  | 'Documents Juridiques'
  | 'Contenu Éducatif'
  | 'Contenu Créatif'
  | 'CV et Lettres de Motivation'
  | 'Autres';

export type ContentStatus = 'brouillon' | 'en_revision' | 'publie' | 'archive';

export const CONTENT_CATEGORIES: ContentCategory[] = [
  'Articles de Blog',
  'Publications sur les Réseaux Sociaux',
  'Emails et Newsletters',
  'Pages Web',
  'Descriptions de Produits',
  'Communiqués de Presse',
  'Scripts',
  'Documents Professionnels',
  'Annonces Publicitaires',
  'Contenu SEO Spécifique',
  'Documents Juridiques',
  'Contenu Éducatif',
  'Contenu Créatif',
  'CV et Lettres de Motivation',
  'Autres'
];

export const CONTENT_STATUSES: Record<ContentStatus, string> = {
  brouillon: 'Brouillon',
  en_revision: 'En révision',
  publie: 'Publié',
  archive: 'Archivé'
};