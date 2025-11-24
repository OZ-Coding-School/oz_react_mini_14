import supabase from '@/lib/supabaseClient';

async function toggleMovieFavorite({ params }) {
  const { userId, movieId, title, posterPath, voteAverage, isFavorite } =
    params;
  const { error } = isFavorite
    ? await supabase
        .from('users_favorites')
        .delete()
        .eq('users_id', userId)
        .eq('movie_id', movieId)
    : await supabase.from('users_favorites').insert({
        users_id: userId,
        movie_id: movieId,
        title,
        poster_path: posterPath,
        vote_average: voteAverage,
      });

  if (error) throw error;
}

export { toggleMovieFavorite };
