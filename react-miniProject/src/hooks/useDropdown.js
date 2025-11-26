import { useState } from "react";

export const useDropdown = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleDropdown = () => setOpenMenu((prev) => !prev);
  const closeDropdown = () => setOpenMenu(false);

  return {
    openMenu,
    toggleDropdown,
    closeDropdown,
  };
};
