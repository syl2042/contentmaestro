-- Drop existing contenus table if it exists
DROP TABLE IF EXISTS contenus CASCADE;

-- Create contenus table with updated structure
CREATE TABLE contenus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  id_profil_redacteur UUID REFERENCES profils_redacteurs(id) ON DELETE CASCADE,
  projet_id UUID REFERENCES projets(id) ON DELETE SET NULL,
  auteur_id UUID REFERENCES users(id) ON DELETE SET NULL,
  titre VARCHAR NOT NULL,
  description TEXT,
  type_contenu VARCHAR CHECK (type_contenu IN ('texte', 'audio', 'image')),
  categorie VARCHAR NOT NULL,
  format VARCHAR,
  statut VARCHAR DEFAULT 'brouillon' CHECK (statut IN ('brouillon', 'en_revision', 'publie', 'archive')),
  contenu_texte TEXT,
  contenu_audio TEXT,
  contenu_image TEXT,
  langue VARCHAR DEFAULT 'fr',
  visibilite VARCHAR DEFAULT 'prive' CHECK (visibilite IN ('prive', 'public')),
  version INTEGER DEFAULT 1,
  nombre_mots INTEGER,
  nombre_caracteres INTEGER,
  tags VARCHAR[],
  seo_meta_titre VARCHAR,
  seo_meta_description TEXT,
  seo_mots_cles VARCHAR[],
  score_seo JSONB,
  metadata JSONB,
  date_creation TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  date_modification TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT categorie_check CHECK (
    categorie IN (
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
    )
  )
);

-- Create indexes for better performance
CREATE INDEX idx_contenus_profil ON contenus(id_profil_redacteur);
CREATE INDEX idx_contenus_projet ON contenus(projet_id);
CREATE INDEX idx_contenus_auteur ON contenus(auteur_id);
CREATE INDEX idx_contenus_categorie ON contenus(categorie);
CREATE INDEX idx_contenus_statut ON contenus(statut);

-- Enable RLS
ALTER TABLE contenus ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Contenus can be read by profile owner" ON contenus
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profils_redacteurs pr
      WHERE pr.id = contenus.id_profil_redacteur
      AND pr.user_id = auth.uid()
    )
  );

CREATE POLICY "Contenus can be inserted by profile owner" ON contenus
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profils_redacteurs pr
      WHERE pr.id = contenus.id_profil_redacteur
      AND pr.user_id = auth.uid()
    )
  );

CREATE POLICY "Contenus can be updated by profile owner" ON contenus
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profils_redacteurs pr
      WHERE pr.id = contenus.id_profil_redacteur
      AND pr.user_id = auth.uid()
    )
  );

CREATE POLICY "Contenus can be deleted by profile owner" ON contenus
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profils_redacteurs pr
      WHERE pr.id = contenus.id_profil_redacteur
      AND pr.user_id = auth.uid()
    )
  );

-- Create function to update modified timestamp
CREATE OR REPLACE FUNCTION update_contenus_modtime()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modification = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating timestamps
CREATE TRIGGER update_contenus_modtime
    BEFORE UPDATE ON contenus
    FOR EACH ROW
    EXECUTE FUNCTION update_contenus_modtime();