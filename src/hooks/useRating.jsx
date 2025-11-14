import { useState, useEffect } from "react";
import { supabase } from "@/api/supabase";
import { useAuth } from "@/hooks";

const useRating = (movieId, movieTitle, moviePoster) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 사용자의 기존 평점 불러오기
  useEffect(() => {
    const fetchRating = async () => {
      if (!user || !movieId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("ratings")
          .select("rating")
          .eq("user_id", user.id)
          .eq("movie_id", movieId)
          .maybeSingle();

        if (error) {
          console.error("Error fetching rating:", error);
          return;
        }

        if (data) {
          setRating(data.rating);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [user, movieId]);

  // 평점 저장/업데이트
  const saveRating = async (newRating) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return false;
    }

    if (newRating < 1 || newRating > 5) {
      alert("1~5점 사이의 평점을 선택해주세요.");
      return false;
    }

    setSaving(true);

    try {
      const ratingData = {
        user_id: user.id,
        movie_id: movieId,
        rating: newRating,
        movie_title: movieTitle,
        movie_poster: moviePoster,
        updated_at: new Date().toISOString(),
      };

      // upsert: 존재하면 업데이트, 없으면 삽입
      const { error } = await supabase.from("ratings").upsert(ratingData, {
        onConflict: "user_id,movie_id",
      });

      if (error) throw error;

      setRating(newRating);
      return true;
    } catch (error) {
      console.error("Error saving rating:", error);
      alert("평점 저장에 실패했습니다.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  // 평점 삭제
  const deleteRating = async () => {
    if (!user) return false;

    setSaving(true);

    try {
      const { error } = await supabase
        .from("ratings")
        .delete()
        .eq("user_id", user.id)
        .eq("movie_id", movieId);

      if (error) throw error;

      setRating(0);
      return true;
    } catch (error) {
      console.error("Error deleting rating:", error);
      alert("평점 삭제에 실패했습니다.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    rating,
    loading,
    saving,
    saveRating,
    deleteRating,
  };
};

export default useRating;
