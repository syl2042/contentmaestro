-- First, ensure the traits_personnalite table exists and has the correct structure
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

-- Ensure the profils_redacteurs table has the correct structure
ALTER TABLE profils_redacteurs 
DROP COLUMN IF EXISTS traits_personnalite CASCADE;

-- Add function to get traits for a profile
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

-- Create a trigger to automatically update traits when a profile is created/updated
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

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS profile_traits_trigger ON profils_redacteurs;

-- Create the trigger
CREATE TRIGGER profile_traits_trigger
    AFTER INSERT OR UPDATE ON profils_redacteurs
    FOR EACH ROW
    EXECUTE FUNCTION handle_profile_traits();