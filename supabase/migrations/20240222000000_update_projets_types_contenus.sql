-- Update projets table structure
ALTER TABLE projets 
DROP COLUMN IF EXISTS types_contenus CASCADE;

ALTER TABLE projets 
ADD COLUMN types_contenus text[] DEFAULT '{}';

ALTER TABLE projets 
DROP COLUMN IF EXISTS sous_types_contenus CASCADE;

ALTER TABLE projets 
ADD COLUMN sous_types_contenus jsonb DEFAULT '[]';

-- Add check constraint for types_contenus
ALTER TABLE projets
ADD CONSTRAINT types_contenus_check CHECK (
  array_length(types_contenus, 1) >= 0
);

-- Add check constraint for sous_types_contenus
ALTER TABLE projets
ADD CONSTRAINT sous_types_contenus_check CHECK (
  jsonb_typeof(sous_types_contenus) = 'array'
);

-- Create a trigger function to validate sous_types_contenus structure
CREATE OR REPLACE FUNCTION validate_sous_types_contenus()
RETURNS trigger AS $$
BEGIN
  IF NOT (
    SELECT bool_and(
      (value->>'type_id') IS NOT NULL AND
      jsonb_typeof(value->'subtype_ids') = 'array'
    )
    FROM jsonb_array_elements(NEW.sous_types_contenus)
  ) THEN
    RAISE EXCEPTION 'Invalid sous_types_contenus structure';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to validate sous_types_contenus before insert or update
CREATE TRIGGER check_sous_types_contenus
  BEFORE INSERT OR UPDATE ON projets
  FOR EACH ROW
  EXECUTE FUNCTION validate_sous_types_contenus();