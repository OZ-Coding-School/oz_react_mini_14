import { useSelector } from "react-redux";
import "./MovieBookMarkButton.scss";
import { useEffect, useState } from "react";
import { supabaseClient } from "../../../supabase/context";

export default function MovieBookMarkButton({ movieInfo, userId }) {
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [bookMarkId, setBookMarkId] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("bookmarks")
        .select("*")
        .eq("user_id", userId)
        .eq("movie_id", movieInfo.id)
        .maybeSingle();

      if (data) {
        setIsBookMarked(true);
        setBookMarkId(data.id);
      } else {
        setIsBookMarked(false);
        setBookMarkId(data);
      }
    };
    fetchData();
  }, [movieInfo.id, userId]);

  const addBookmark = async () => {
    const { data, error } = await supabaseClient
      .from("bookmarks")
      .insert({
        user_id: userId,
        movie_id: movieInfo.id,
        movie_title: movieInfo.title,
        movie_img: movieInfo.poster_path,
        movie_vote_average: movieInfo.vote_average,
      })
      .select();

    if (error) {
      console.log("Insert error:", error);
      return;
    }

    setIsBookMarked(true);
    setBookMarkId(data[0].id);
  };

  const removeBookmark = async () => {
    const { error } = await supabaseClient
      .from("bookmarks")
      .delete()
      .eq("id", bookMarkId)
      .eq("user_id", userId);

    if (error) {
      console.log("Delete error:", error);
      return;
    }

    setIsBookMarked(false);
    setBookMarkId(null);
  };

  const handleClick = (e) => {
    e.stopPropagation();

    if (!userId) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (isBookMarked) {
      removeBookmark();
    } else {
      addBookmark();
    }
  };

  return (
    <div className={`bookMark-icons ${isDarkMode ? "dark" : "light"}`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
        className="bookMark-icons-btn"
        style={{ border: "none" }}
      >
        {isBookMarked ? "★" : "☆"}
      </button>
    </div>
  );
}
