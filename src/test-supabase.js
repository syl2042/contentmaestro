import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function testSupabaseConnection() {
  try {
    console.log('🔄 Test de connexion à Supabase...');
    
    const minimalProfile = {
      nom_profil: 'Test Simple'
    };

    console.log('🔄 Création du profil test minimal...');
    console.log('Données à insérer:', minimalProfile);

    const { data, error } = await supabase
      .from('profils_redacteurs')
      .insert(minimalProfile)
      .select();

    if (error) {
      console.error('❌ Erreur:', error);
      return;
    }

    console.log('✅ Profil créé avec succès:', data);

  } catch (err) {
    console.error('❌ Erreur inattendue:', err);
  }
}

testSupabaseConnection();