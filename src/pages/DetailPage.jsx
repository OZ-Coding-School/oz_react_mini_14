import styled from "styled-components";

import NavigationBar from "./components/NavigationBar";

import { useParams } from "react-router-dom";

import useTmdbDetailData from "./data/hooks/useTmdbDetailData";

// <-------------------- function -------------------->

export default function DetailPage() {
  const { id } = useParams();

  const tmdbDetail = useTmdbDetailData(id);

  // <-------------------- return -------------------->

  return (
    <>
      <NavigationBar />
      <Detail>
        <Poster
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${tmdbDetail.backdrop_path}`}
          alt={tmdbDetail.title}
        />
        <Info>
          <TitleRating>
            <Title>{tmdbDetail.title}</Title>
            <Rating>{tmdbDetail.vote_average}</Rating>
          </TitleRating>
          <Overview>{tmdbDetail.overview}</Overview>
        </Info>
      </Detail>
    </>
  );
}

// <-------------------- styled-components -------------------->

const Detail = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #444444;
`;

const Poster = styled.img`
  display: flex;
  width: 100%;
  max-width: 800px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Info = styled.div`
  max-width: 800px;
`;

const TitleRating = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  color: #bafd00;
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 10px;
`;

const Overview = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Release = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Rating = styled.p`
  font-size: 16px;
`;
