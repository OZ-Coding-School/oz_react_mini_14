import React from "react";
import Banner from "@/components/Banner/Banner";
import PopularMovies from "@components/PopularMovies";
import TopRankedMovie from "@/components/TopRankedMovie";

const MainPage = () => {
  return (
    <main>
      <Banner />
      <TopRankedMovie />
      <PopularMovies />
    </main>
  );
};

export default MainPage;
