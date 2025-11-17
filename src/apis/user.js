import supabase from '@/lib/supabaseClient';

async function getUserInfo({ params }) {
  const { id } = params;

  const { data, error } = await supabase
    .from('users')
    .select('users_id, name, email, profile_img_url')
    .eq('users_id', id);

  if (error) throw error;
  return {
    id: data[0].users_id,
    name: data[0].name,
    email: data[0].email,
    profileImgUrl: data[0].profile_img_url ?? '/images/default_profile.png',
  };
}

export { getUserInfo };
