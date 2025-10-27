import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import listData from '../../movieListData.json';
import kungfuDetail from '../../movieDetailData.json';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

// TMDB 장르 id → 한글명 매핑
const GENRE_MAP = {
  28: '액션', 12: '모험', 16: '애니메이션', 35: '코미디', 80: '범죄',
  99: '다큐멘터리', 18: '드라마', 10751: '가족', 14: '판타지', 36: '역사',
  27: '공포', 10402: '음악', 9648: '미스터리', 10749: '로맨스', 878: 'SF',
  10770: 'TV 영화', 53: '스릴러', 10752: '전쟁', 37: '서부'
};

// id로 영화 하나 가져오기 (쿵푸팬더는 상세 json 우선)
function getMovie(id) {
  if (String(kungfuDetail.id) === String(id)) {
    // movieDetailData.json 구조를 그대로 호환
    return {
      id: kungfuDetail.id,
      title: kungfuDetail.title,
      original_title: kungfuDetail.original_title,
      overview: kungfuDetail.overview,
      poster_path: kungfuDetail.poster_path,
      backdrop_path: kungfuDetail.backdrop_path,
      vote_average: kungfuDetail.vote_average,
      genres: kungfuDetail.genres?.map(g => ({ id: g.id, name: g.name })) || [],
    };
  }

  const fromList = listData.results.find(m => String(m.id) === String(id));
  if (!fromList) return null;

  return {
    id: fromList.id,
    title: fromList.title,
    original_title: fromList.original_title,
    overview: fromList.overview,
    poster_path: fromList.poster_path,
    backdrop_path: fromList.backdrop_path,
    vote_average: fromList.vote_average,
    // list에는 genre_ids만 있으니 매핑으로 이름 생성
    genres: (fromList.genre_ids || []).map(gid => ({ id: gid, name: GENRE_MAP[gid] || String(gid) })),
  };
}

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = getMovie(id);

  if (!movie) {
    return (
      <section className="detail-wrap">
        <p>해당 영화를 찾을 수 없어요.</p>
        <button onClick={() => navigate(-1)} className="btn-back">뒤로가기</button>
      </section>
    );
  }

  return (
    <section className="detail-wrap">
      <div className="detail-left">
        {movie.poster_path ? (
          <img
            className="detail-poster"
            src={`${IMG_BASE}${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="detail-poster placeholder">No Poster</div>
        )}
      </div>

      <div className="detail-right">
        <div className="detail-top">
          <h1 className="detail-title">{movie.title}</h1>
          <div className="detail-score"><span className="star">★</span>{movie.vote_average}</div>
        </div>

        <div className="detail-genres">
          {movie.genres && movie.genres.length > 0
            ? movie.genres.map(g => g.name).join(' · ')
            : '장르 정보 없음'}
        </div>

        <div className="detail-overview">{movie.overview}</div>
      </div>
    </section>
  );
}
