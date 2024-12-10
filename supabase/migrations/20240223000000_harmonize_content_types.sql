-- Mise à jour de la structure de la table projets
ALTER TABLE projets 
DROP COLUMN IF EXISTS types_contenus CASCADE;

ALTER TABLE projets 
ADD COLUMN types_contenus text[] DEFAULT '{}';

ALTER TABLE projets 
DROP COLUMN IF EXISTS sous_types_contenus CASCADE;

ALTER TABLE projets 
ADD COLUMN sous_types_contenus jsonb DEFAULT '[]';

-- Ajout des contraintes
ALTER TABLE projets
ADD CONSTRAINT types_contenus_check CHECK (
  array_length(types_contenus, 1) >= 0
);

ALTER TABLE projets
ADD CONSTRAINT sous_types_contenus_check CHECK (
  jsonb_typeof(sous_types_contenus) = 'array' AND
  (
    SELECT bool_and(
      jsonb_typeof(elem->'type_id') = 'string' AND
      jsonb_typeof(elem->'subtype_ids') = 'array'
    )
    FROM jsonb_array_elements(sous_types_contenus) elem
  )
);