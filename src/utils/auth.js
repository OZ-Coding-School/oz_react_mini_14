import supabase from '@/lib/supabaseClient';
import { ERROR_MESSAGE, SESSION_STORAGE_KEYS } from '@/constants';

async function executeAuthAction({ action }) {
  try {
    await action();

    return { success: true, error: null };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: {
        message: error?.message ?? ERROR_MESSAGE.UNEXPECTED_ERROR,
      },
    };
  }
}

function setHasJustLoggedIn(value) {
  sessionStorage.setItem(
    SESSION_STORAGE_KEYS.HAS_JUST_LOGGED_IN,
    JSON.stringify(value),
  );
}

function getHasJustLoggedIn() {
  return JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE_KEYS.HAS_JUST_LOGGED_IN),
  );
}

function setHasJustLoggedOut(value) {
  sessionStorage.setItem(
    SESSION_STORAGE_KEYS.HAS_JUST_LOGGED_OUT,
    JSON.stringify(value),
  );
}

function getHasJustLoggedOut() {
  return JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE_KEYS.HAS_JUST_LOGGED_OUT),
  );
}

async function signUp({ email, password, name }) {
  return await executeAuthAction({
    action: async () => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (error) throw error;
    },
  });
}

async function logIn({ email, password }) {
  return executeAuthAction({
    action: async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    },
  });
}

async function logInWithProvider({ provider }) {
  return await executeAuthAction({
    action: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
      });

      if (error) throw error;
    },
  });
}

async function logOut() {
  return await executeAuthAction({
    action: async () => {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    },
  });
}

export {
  setHasJustLoggedIn,
  getHasJustLoggedIn,
  setHasJustLoggedOut,
  getHasJustLoggedOut,
  signUp,
  logIn,
  logInWithProvider,
  logOut,
};
