import supabase from '@/lib/supabaseClient';

async function getUserInfo({ params }) {
  const { id } = params;

  const { data, error } = await supabase
    .from('users')
    .select('users_id, name, email, profile_img_url')
    .eq('users_id', id);

  if (error) throw error;
  return data[0];
}

export { getUserInfo };
