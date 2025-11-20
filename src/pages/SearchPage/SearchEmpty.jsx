import { Typography } from "@/components";
import { EmptyState } from "./style";

const SearchEmpty = ({ type, searchTerm }) => {
  const content = {
    loading: {
      title: "검색 중...",
      description: null,
    },
    empty: {
      title: "영화를 검색해보세요.",
      description: "제목, 장르, 감독 등으로 검색할 수 있습니다.",
    },
    noResults: {
      title: `"${searchTerm}"에 검색 결과가 없습니다.`,
      description: "다른 검색어로 시도해보세요.",
    },
  };

  const { title, description } = content[type];

  return (
    <EmptyState>
      <Typography
        variant={type === "loading" ? "body" : "h3"}
        style={{ marginBottom: description ? "16px" : "0" }}
      >
        {title}
      </Typography>
      {description && (
        <Typography variant="body" style={{ color: "rgba(255, 255, 255, 0.6" }}>
          {description}
        </Typography>
      )}
    </EmptyState>
  );
};

export default SearchEmpty;
