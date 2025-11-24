import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/api";
import { useAuth } from "@/hooks";
import { showToast } from "@/utils";

const useReview = (movieId) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  //리뷰 최신순서로 정렬하기
  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      if (a.user_id === user?.id) return -1;
      if (b.user_id === user?.id) return 1;
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }, [reviews, user?.id]);

  //전체 리뷰 불러오기
  useEffect(() => {
    const fetchReviews = async () => {
      if (!movieId) return;

      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("movie_id", movieId)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setReviews(data || []);

        // 내 리뷰 찾기
        if (user) {
          const mine = data?.find((r) => r.user_id === user.id);
          setMyReview(mine || null);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId, user]);

  //리뷰 저장&수정
  const saveReview = async (reviewText, rating, movieData) => {
    if (!user) {
      showToast.warning("로그인이 필요합니다.");
      return false;
    }

    if (!reviewText.trim()) {
      showToast.warning("리뷰 내용을 입력해주세요.");
      return false;
    }

    setSaving(true);

    try {
      const reviewData = {
        user_id: user.id,
        movie_id: movieData.id,
        movie_title: movieData.title,
        movie_poster: movieData.poster_path,
        rating,
        review_text: reviewText,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("reviews")
        .upsert(reviewData, {
          onConflict: "user_id,movie_id",
        })
        .select()
        .maybeSingle();

      if (error) throw error;
      setMyReview(data);

      //리뷰 목록 업데이트
      setReviews((prev) => {
        const filtered = prev.filter((r) => r.user_id !== user.id);
        return [data, ...filtered];
      });
      return true;
    } catch (error) {
      console.error("Error saving review:", error);
      showToast.error("리뷰 저장에 실패했습니다.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  //리뷰 삭제
  const deleteReview = async () => {
    if (!user || !myReview) return false;

    setSaving(true);

    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("user_id", user.id)
        .eq("movie_id", movieId);

      if (error) throw error;

      setReviews((prev) => prev.filter((r) => r.user_id !== user.id));

      return true;
    } catch (error) {
      console.error("Error deleting review:", error);
      showToast.error("리뷰 삭제에 실패했습니다.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    reviews: sortedReviews,
    myReview,
    loading,
    saving,
    saveReview,
    deleteReview,
  };
};

export default useReview;
