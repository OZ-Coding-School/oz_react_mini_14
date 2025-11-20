import supabase from '@/lib/supabaseClient';

async function getFavoriteMovieList({ params }) {
  const { userId } = params;
  const { data, error } = await supabase
    .from('users_favorites')
    .select('movie_id, title, poster_path, vote_average')
    .eq('users_id', userId);

  if (error) throw error;
  return data.map((item) => ({
    ...item,
    id: item.movie_id,
  }));
}

export { getFavoriteMovieList };
