import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout.jsx";
import MainPage from "./page/MainPage.jsx";
import DetailPage from "./page/DetailPage.jsx";

import { createGlobalStyle } from "styled-components";

// <-------------------- function, return -------------------->

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/details/:id" element={<DetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// <-------------------- styled-components -------------------->

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    background-color: black};
`;
