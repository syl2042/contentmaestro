-- Drop existing tables if they exist
DROP TABLE IF EXISTS profils_redacteurs CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR NOT NULL UNIQUE,
  nom VARCHAR,
  prenom VARCHAR,
  date_creation TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  dernier_login TIMESTAMP WITH TIME ZONE
);

-- Create profils_redacteurs table
CREATE TABLE profils_redacteurs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  nom_profil VARCHAR NOT NULL,
  specialite_thematique VARCHAR NOT NULL,
  style_ecriture VARCHAR NOT NULL,
  ton VARCHAR NOT NULL,
  niveau_langage VARCHAR NOT NULL,
  traits_personnalite VARCHAR[] NOT NULL,
  parametres_seo JSONB NOT NULL,
  date_creation TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  date_modification TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT parametres_seo_check CHECK (
    parametres_seo ? 'densite_mots_cles' AND
    parametres_seo ? 'meta_descriptions'
  )
);

-- Create indexes
CREATE INDEX idx_profils_redacteurs_user_id ON profils_redacteurs(user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profils_redacteurs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable update access for users" ON users;
DROP POLICY IF EXISTS "Profiles can be read by owner" ON profils_redacteurs;
DROP POLICY IF EXISTS "Profiles can be inserted by owner" ON profils_redacteurs;
DROP POLICY IF EXISTS "Profiles can be updated by owner" ON profils_redacteurs;
DROP POLICY IF EXISTS "Profiles can be deleted by owner" ON profils_redacteurs;

-- Create policies for users table
CREATE POLICY "Enable read access for authenticated users" ON users
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for users" ON users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update access for users" ON users
  FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for profils_redacteurs table
CREATE POLICY "Profiles can be read by owner" ON profils_redacteurs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Profiles can be inserted by owner" ON profils_redacteurs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Profiles can be updated by owner" ON profils_redacteurs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Profiles can be deleted by owner" ON profils_redacteurs
  FOR DELETE USING (auth.uid() = user_id);

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modification = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating timestamps
CREATE TRIGGER update_profils_redacteurs_modtime
    BEFORE UPDATE ON profils_redacteurs
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();