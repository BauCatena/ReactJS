import { supabase } from '../lib/supabase';

// Registro con creación de perfil
export async function signUp(email, password, username) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });
  if (error) throw error;

  // Crear perfil en tabla user_profiles
  const { error: profileError } = await supabase.from('user_profiles').insert({
    id: data.user.id,
    username,
  });
  if (profileError) throw profileError;

  return data;
}

// Login con email y password
export async function signIn(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

// Login con Google
export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
  if (error) throw error;
}

// Logout
export async function signOut() {
  await supabase.auth.signOut();
}

// Listener de cambios de sesión
export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
}
