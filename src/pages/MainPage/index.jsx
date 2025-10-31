import React from "react";
import Banner from "@components/Banner";
import PopularMovies from "@components/PopularMovies";
import TopRankedMovie from "@/components/TopRankedMovie";

const MainPage = () => {
  return (
    <div>
      <Banner />
      <TopRankedMovie />
      <PopularMovies />
    </div>
  );
};

export default MainPage;
