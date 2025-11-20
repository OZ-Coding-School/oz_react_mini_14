export const SIDE_MENU_CATEGORIES = {
  "kines-pick": {
    name: "KINE's Pick",
    items: [
      { label: "오늘의 추천영화", path: "/popular" },
      { label: "오늘의 랭킹", path: "/top_ranked" },
    ],
  },
  community: {
    name: "커뮤니티",
    items: [
      { label: "요즘 뜨는 코멘트", path: "/community/free" },
      { label: "KINEMA 라운지", path: "/community/review" },
    ],
  },
  mykinema: {
    name: "나의KINEMA",
    items: [
      { label: "마이페이지", path: "/mypage" },
      { label: "내가 찜한 영화", path: "/mypage/wishlist" },
      { label: "내가 쓴 리뷰", path: "/mypage/reviews" },
    ],
  },
};

//기본 활성화 카테고리
export const DEFAULT_CATEGORY = "kines-pick";
