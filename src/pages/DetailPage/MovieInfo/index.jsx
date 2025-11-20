import { getImageUrl } from "@/constants/images";
import {
  Content,
  ContentBox,
  Poster,
  InfoColumn,
  InfoRow,
  Label,
  Value,
  Divider,
  Overview,
} from "./style";

const MovieInfo = ({ detail, credits }) => {
  const director = credits?.crew.find((c) => c.job === "Director")?.name || "";
  const castList =
    credits?.cast
      .slice(0, 5)
      .map((c) => c.name)
      .join(", ") || "";

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <Content>
      <ContentBox>
        <Poster
          src={getImageUrl(detail.poster_path, "original")}
          alt={detail.title}
        />
        <InfoColumn>
          <InfoRow>
            <Label>감독</Label>
            <Value>{director}</Value>
          </InfoRow>
          <InfoRow>
            <Label>출연</Label>
            <Value>{castList}</Value>
          </InfoRow>
          <InfoRow>
            <Label>국가</Label>
            <Value>
              {detail.production_countries.map((c) => c.name).join(", ")}
            </Value>
          </InfoRow>
          <Divider />
          <Overview>{detail.overview}</Overview>
        </InfoColumn>
      </ContentBox>
    </Content>
  );
};

export default MovieInfo;
