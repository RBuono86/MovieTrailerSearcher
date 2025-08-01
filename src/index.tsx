import React from "react";
import ReactDOM from "react-dom/client";
import MovieSearch from "./MovieSearch";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <MovieSearch />
  </React.StrictMode>
);
