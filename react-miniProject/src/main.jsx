// 랜더 역할만 하는 main
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.scss";

createRoot(document.getElementById("root")).render(<App />);
