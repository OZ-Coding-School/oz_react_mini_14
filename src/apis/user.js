import supabase from '@/lib/supabaseClient';

async function getUserInfo({ params }) {
  const { id } = params;

  const { data, error } = await supabase
    .from('users')
    .select('users_id, name, email, profile_img_url')
    .eq('users_id', id)
    .single();

  if (error) throw error;
  return {
    id: data.users_id,
    name: data.name,
    email: data.email,
    profileImgUrl: data.profile_img_url ?? '/images/default_profile.png',
  };
}

export { getUserInfo };
