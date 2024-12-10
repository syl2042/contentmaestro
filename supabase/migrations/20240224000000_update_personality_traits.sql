-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Traits can be read by profile owner" ON traits_personnalite;
DROP POLICY IF EXISTS "Traits can be inserted by profile owner" ON traits_personnalite;
DROP POLICY IF EXISTS "Traits can be updated by profile owner" ON traits_personnalite;
DROP POLICY IF EXISTS "Traits can be deleted by profile owner" ON traits_personnalite;

-- Drop existing traits_personnalite column from profils_redacteurs
ALTER TABLE profils_redacteurs 
DROP CONSTRAINT IF EXISTS parametres_seo_check,
DROP COLUMN IF EXISTS traits_personnalite;

-- Create traits_personnalite table if it doesn't exist
CREATE TABLE IF NOT EXISTS traits_personnalite (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profil_redacteur_id UUID NOT NULL REFERENCES profils_redacteurs(id) ON DELETE CASCADE,
    trait VARCHAR(255) NOT NULL,
    origine VARCHAR(50) CHECK (origine IN ('manuel', 'recommande')) DEFAULT 'recommande',
    description TEXT,
    date_creation TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_trait_per_profil UNIQUE (profil_redacteur_id, trait)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_traits_personnalite_profil ON traits_personnalite(profil_redacteur_id);
CREATE INDEX IF NOT EXISTS idx_traits_personnalite_trait ON traits_personnalite(trait);

-- Enable RLS on the new table
ALTER TABLE traits_personnalite ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Traits can be read by profile owner" ON traits_personnalite
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profils_redacteurs pr
      WHERE pr.id = traits_personnalite.profil_redacteur_id
      AND pr.user_id = auth.uid()
    )
  );

CREATE POLICY "Traits can be inserted by profile owner" ON traits_personnalite
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profils_redacteurs pr
      WHERE pr.id = traits_personnalite.profil_redacteur_id
      AND pr.user_id = auth.uid()
    )
  );

CREATE POLICY "Traits can be updated by profile owner" ON traits_personnalite
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profils_redacteurs pr
      WHERE pr.id = traits_personnalite.profil_redacteur_id
      AND pr.user_id = auth.uid()
    )
  );

CREATE POLICY "Traits can be deleted by profile owner" ON traits_personnalite
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profils_redacteurs pr
      WHERE pr.id = traits_personnalite.profil_redacteur_id
      AND pr.user_id = auth.uid()
    )
  );

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS update_traits_personnalite_modtime ON traits_personnalite;
DROP FUNCTION IF EXISTS update_traits_personnalite_modtime();

-- Create trigger function for updating modified timestamp
CREATE OR REPLACE FUNCTION update_traits_personnalite_modtime()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modification = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating timestamps
CREATE TRIGGER update_traits_personnalite_modtime
    BEFORE UPDATE ON traits_personnalite
    FOR EACH ROW
    EXECUTE FUNCTION update_traits_personnalite_modtime();

-- Update profils_redacteurs table to add recommendations preferences
ALTER TABLE profils_redacteurs 
ADD COLUMN IF NOT EXISTS recommandations_actives BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS parametres_recommandations JSONB DEFAULT '{"style": true, "specialite": true}'::jsonb;

-- Re-add parametres_seo check with updated structure
ALTER TABLE profils_redacteurs
ADD CONSTRAINT parametres_seo_check CHECK (
    parametres_seo ? 'densite_mots_cles' AND
    parametres_seo ? 'meta_descriptions'
);