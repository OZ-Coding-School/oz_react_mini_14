export const SWIPER_CONFIG = {
  spaceBetween: 40,
  slidesPerView: 1.6,
  centeredSlides: true,
  navigation: true,
  pagination: {
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 3,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
  effect: "slide",
  speed: 800,
  breakpoints: {
    1240: {
      slidesPerView: 1.6,
      spaceBetween: 40,
    },
    960: {
      slidesPerView: 1.2,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 1.2,
      spaceBetween: 12,
    },
    0: {
      slidesPerView: 1.2,
      spaceBetween: 4,
    },
  },
};

// 20자 초과 시 '...'으로 표시되게
export const truncateText = (text, wordLimit) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
};
