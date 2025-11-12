export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const IMAGE_SIZE = {
  MEDIUM: "w500",
  ORIGINAL: "original",
};

export const getImageUrl = (path, size = IMAGE_SIZE.MEDIUM) => {
  if (!path) return "/movie/placeholder.jpg";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const LOGO_IMAGE = "/image/keynema_logo.png";
export const SUBTRACT_IMAGE = "/image/subtract.png";
