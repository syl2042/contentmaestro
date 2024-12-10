import { supabase } from './supabase';
import { AuthError } from '@supabase/supabase-js';

export async function signUp(email: string, password: string, userData: { nom: string; prenom: string }) {
  try {
    console.log('Starting sign up process for:', email);
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nom: userData.nom,
          prenom: userData.prenom
        },
        emailRedirectTo: `${window.location.origin}/login`,
      }
    });

    if (authError) {
      console.error('Auth signup error:', authError);
      throw authError;
    }

    if (!authData.user) {
      throw new Error('No user data returned from signup');
    }

    console.log('Auth signup successful:', authData.user.id);

    const { error: profileError } = await supabase
      .from('users')
      .insert([{
        id: authData.user.id,
        email: authData.user.email,
        nom: userData.nom,
        prenom: userData.prenom,
        date_creation: new Date().toISOString()
      }]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
      throw profileError;
    }

    console.log('User profile created successfully');
    return { data: authData, requiresEmailConfirmation: true };
  } catch (error) {
    console.error('Signup process failed:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    console.log('Attempting to sign in:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      if (error instanceof AuthError && error.status === 400 && error.message.includes('email not confirmed')) {
        throw new Error('Please check your email and confirm your account before signing in.');
      }
      console.error('Sign in error:', error);
      throw error;
    }

    console.log('Sign in successful:', data.user?.id);
    return data;
  } catch (error) {
    console.error('Sign in process failed:', error);
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign out error:', error);
    throw error;
  }
  console.log('Sign out successful');
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) throw authError;
    if (!user) return null;

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    return { ...user, profile };
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
}

export async function resendConfirmationEmail(email: string) {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error resending confirmation email:', error);
    throw error;
  }
}