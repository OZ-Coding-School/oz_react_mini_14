import MovieInfo from "@/pages/DetailPage/MovieInfo";
import MovieRating from "@/pages/DetailPage/MovieRating";
import MovieOTT from "@/pages/DetailPage/MovieOTT";

export const DETAIL_PAGE_TABS = {
  info: { label: "기본정보", component: MovieInfo },
  rating: { label: "평점", component: MovieRating },
  ott: { label: "OTT 정보", component: MovieOTT },
};
