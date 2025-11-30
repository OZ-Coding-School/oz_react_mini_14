import { useEffect, useState } from "react";
import { supabaseClient } from "@supabase_path/utilities";

export const useWishListBookMark = (userId) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabaseClient
        .from("bookmarks")
        .select("*")
        .eq("user_id", userId)
        .order("id", { ascending: false });

      if (error) {
        throw error;
      }

      setBookmarks(data);
    } catch (error) {
      console.error("위시리스트 에러:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchBookmarks();
  }, [userId]);

  return { bookmarks, loading, refetch: fetchBookmarks };
};
