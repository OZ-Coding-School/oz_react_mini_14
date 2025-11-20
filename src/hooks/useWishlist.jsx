import { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";
import { useAuth } from "@/hooks";

const useWishlist = (movieId) => {
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 찜 상태 확인
  useEffect(() => {
    const checkWishlist = async () => {
      if (!user || !movieId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("wishlist")
          .select("id")
          .eq("user_id", user.id)
          .eq("movie_id", movieId)
          .maybeSingle();

        if (error) {
          console.error("Error checking wishlist:", error);
          return;
        }

        setIsWishlisted(!!data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkWishlist();
  }, [user, movieId]);

  // 찜 추가
  const addToWishlist = async (movieData) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return false;
    }

    setSaving(true);

    try {
      const wishlistData = {
        user_id: user.id,
        movie_id: movieData.id,
        movie_title: movieData.title,
        movie_poster: movieData.poster_path,
        movie_overview: movieData.overview,
        movie_release_date: movieData.release_date,
        movie_vote_average: movieData.vote_average,
      };

      const { error } = await supabase.from("wishlist").insert(wishlistData);

      if (error) throw error;

      setIsWishlisted(true);
      return true;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("찜 추가에 실패했습니다.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  // 찜 제거
  const removeFromWishlist = async () => {
    if (!user) return false;

    setSaving(true);

    try {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user.id)
        .eq("movie_id", movieId);

      if (error) throw error;

      setIsWishlisted(false);
      return true;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("찜 제거에 실패했습니다.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  // 토글 (추가 & 제거)
  const toggleWishlist = async (movieData) => {
    if (isWishlisted) {
      return await removeFromWishlist();
    } else {
      return await addToWishlist(movieData);
    }
  };

  return {
    isWishlisted,
    loading,
    saving,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
  };
};

export default useWishlist;
