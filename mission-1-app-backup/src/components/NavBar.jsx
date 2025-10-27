import React, { useState, useEffect } from "react";
import "./NavBar.css";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const HandleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${show ? "navbar--show" : ""}`}>
      <div
        className="logo"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <img src="LOGO" alt="logo" />
      </div>
      <div>
        <input
          value={searchValue}
          onChange={HandleChange}
          className="searchbar"
          type="text"
          placeholder="영화 제목을 입력해보세요."
        />
        <button className="login__button">로그인</button>
        <button className="admin__button">회원가입</button>
      </div>
    </header>
  );
};

export default NavBar;
