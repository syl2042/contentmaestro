export interface WriterProfile {
  id: string;
  user_id: string;
  nom_profil: string;
  specialite_thematique: string;
  style_ecriture: string;
  ton: string;
  niveau_langage: string;
  traits_personnalite: string[];
  parametres_seo: {
    densite_mots_cles: number;
    meta_descriptions: boolean;
  };
  recommandations_actives?: boolean;
  parametres_recommandations?: {
    style: boolean;
    specialite: boolean;
  };
  date_creation: string;
  date_modification: string;
}

export interface PersonalityTrait {
  id: string;
  profil_redacteur_id: string;
  trait: string;
  origine: 'manuel' | 'recommande';
  description: string | null;
  date_creation: string;
  date_modification: string;
}