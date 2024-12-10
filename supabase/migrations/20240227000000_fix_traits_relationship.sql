-- First, drop any existing triggers that might conflict
DROP TRIGGER IF EXISTS profile_traits_trigger ON profils_redacteurs;
DROP FUNCTION IF EXISTS handle_profile_traits();

-- Drop the existing traits_personnalite table if it exists
DROP TABLE IF EXISTS traits_personnalite CASCADE;

-- Create the traits_personnalite table with the correct structure
CREATE TABLE traits_personnalite (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profil_redacteur_id UUID NOT NULL REFERENCES profils_redacteurs(id) ON DELETE CASCADE,
    trait VARCHAR(255) NOT NULL,
    origine VARCHAR(50) CHECK (origine IN ('manuel', 'recommande')) DEFAULT 'recommande',
    description TEXT,
    date_creation TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_trait_per_profil UNIQUE (profil_redacteur_id, trait)
);

-- Create indexes for better performance
CREATE INDEX idx_traits_personnalite_profil ON traits_personnalite(profil_redacteur_id);
CREATE INDEX idx_traits_personnalite_trait ON traits_personnalite(trait);

-- Enable RLS on the traits_personnalite table
ALTER TABLE traits_personnalite ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for traits_personnalite
CREATE POLICY "Traits can be read by profile owner" ON traits_personnalite
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profils_redacteurs pr
            WHERE pr.id = traits_personnalite.profil_redacteur_id
            AND pr.user_id = auth.uid()
        )
    );

CREATE POLICY "Traits can be inserted by profile owner" ON traits_personnalite
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profils_redacteurs pr
            WHERE pr.id = traits_personnalite.profil_redacteur_id
            AND pr.user_id = auth.uid()
        )
    );

CREATE POLICY "Traits can be updated by profile owner" ON traits_personnalite
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profils_redacteurs pr
            WHERE pr.id = traits_personnalite.profil_redacteur_id
            AND pr.user_id = auth.uid()
        )
    );

CREATE POLICY "Traits can be deleted by profile owner" ON traits_personnalite
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM profils_redacteurs pr
            WHERE pr.id = traits_personnalite.profil_redacteur_id
            AND pr.user_id = auth.uid()
        )
    );

-- Create function to update modified timestamp
CREATE OR REPLACE FUNCTION update_traits_personnalite_modtime()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modification = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating timestamps
CREATE TRIGGER update_traits_personnalite_modtime
    BEFORE UPDATE ON traits_personnalite
    FOR EACH ROW
    EXECUTE FUNCTION update_traits_personnalite_modtime();

-- Create function to get traits for a profile
CREATE OR REPLACE FUNCTION get_profile_traits(profile_id UUID)
RETURNS TEXT[] AS $$
BEGIN
    RETURN ARRAY(
        SELECT trait
        FROM traits_personnalite
        WHERE profil_redacteur_id = profile_id
        ORDER BY date_creation
    );
END;
$$ LANGUAGE plpgsql;

-- Add a temporary traits_personnalite column to profils_redacteurs to handle the transition
ALTER TABLE profils_redacteurs 
ADD COLUMN IF NOT EXISTS traits_personnalite TEXT[] DEFAULT '{}';

-- Create function to handle profile traits
CREATE OR REPLACE FUNCTION handle_profile_traits()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete existing traits for this profile
    DELETE FROM traits_personnalite WHERE profil_redacteur_id = NEW.id;
    
    -- Insert new traits
    IF NEW.traits_personnalite IS NOT NULL THEN
        INSERT INTO traits_personnalite (profil_redacteur_id, trait, origine)
        SELECT NEW.id, unnest(NEW.traits_personnalite), 'manuel';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for handling profile traits
CREATE TRIGGER profile_traits_trigger
    AFTER INSERT OR UPDATE ON profils_redacteurs
    FOR EACH ROW
    EXECUTE FUNCTION handle_profile_traits();