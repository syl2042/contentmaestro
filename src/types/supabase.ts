export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          nom: string | null;
          prenom: string | null;
          date_creation: string;
          dernier_login: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          nom?: string | null;
          prenom?: string | null;
          date_creation?: string;
          dernier_login?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          nom?: string | null;
          prenom?: string | null;
          date_creation?: string;
          dernier_login?: string | null;
        };
      };
      profils_redacteurs: {
        Row: {
          id: string;
          user_id: string;
          nom_profil: string;
          specialite_thematique: string;
          style_ecriture: string;
          ton: string;
          niveau_langage: string;
          parametres_seo: {
            densite_mots_cles: number;
            meta_descriptions: boolean;
          };
          recommandations_actives: boolean;
          parametres_recommandations: {
            style: boolean;
            specialite: boolean;
          };
          date_creation: string;
          date_modification: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          nom_profil: string;
          specialite_thematique: string;
          style_ecriture: string;
          ton: string;
          niveau_langage: string;
          parametres_seo: {
            densite_mots_cles: number;
            meta_descriptions: boolean;
          };
          recommandations_actives?: boolean;
          parametres_recommandations?: {
            style: boolean;
            specialite: boolean;
          };
          date_creation?: string;
          date_modification?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          nom_profil?: string;
          specialite_thematique?: string;
          style_ecriture?: string;
          ton?: string;
          niveau_langage?: string;
          parametres_seo?: {
            densite_mots_cles: number;
            meta_descriptions: boolean;
          };
          recommandations_actives?: boolean;
          parametres_recommandations?: {
            style: boolean;
            specialite: boolean;
          };
          date_creation?: string;
          date_modification?: string;
        };
      };
      traits_personnalite: {
        Row: {
          id: string;
          profil_redacteur_id: string;
          trait: string;
          origine: 'manuel' | 'recommande';
          description: string | null;
          date_creation: string;
          date_modification: string;
        };
        Insert: {
          id?: string;
          profil_redacteur_id: string;
          trait: string;
          origine?: 'manuel' | 'recommande';
          description?: string | null;
          date_creation?: string;
          date_modification?: string;
        };
        Update: {
          id?: string;
          profil_redacteur_id?: string;
          trait?: string;
          origine?: 'manuel' | 'recommande';
          description?: string | null;
          date_creation?: string;
          date_modification?: string;
        };
      };
      // ... rest of the tables remain unchanged
    };
  };
}