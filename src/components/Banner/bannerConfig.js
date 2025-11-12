export const SWIPER_CONFIG = {
  spaceBetween: 0,
  slidesPerView: 1.6,
  navigation: true,
  pagination: {
    clickable: true,
    dynamicBullets: false,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
  effect: "slide",
  speed: 800,
  breakpoints: {
    1240: { slidesPerView: 3 },
    960: { slidesPerView: 2 },
    768: { slidesPerView: 1.6 },
    0: { slidesPerView: 1.6 },
  },
};

// 20자 초과 시 '...'으로 표시되게
export const truncateText = (text, wordLimit) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
};
