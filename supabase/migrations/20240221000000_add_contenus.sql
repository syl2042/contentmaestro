-- Create contenus table
CREATE TABLE contenus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  id_profil_redacteur UUID NOT NULL REFERENCES profils_redacteurs(id) ON DELETE CASCADE,
  titre TEXT NOT NULL,
  categorie TEXT NOT NULL,
  contenu TEXT NOT NULL,
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

-- Create index for better performance
CREATE INDEX idx_contenus_profil ON contenus(id_profil_redacteur);

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
CREATE TRIGGER update_contenus_modtime
    BEFORE UPDATE ON contenus
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();