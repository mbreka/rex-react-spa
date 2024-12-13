import React, { FC, useContext } from "react";
import { getProducts, postLogin, getMe, postRefresh } from "@/api";
import { AppContext } from "@/providers/AppProvider";

const App: FC = () => {
  const { login } = useContext(AppContext)!;

  return (
    <div className="App">
      <img src={"/logo.svg"} alt="" srcSet="" />
      <a href="/" target="_blank" rel="noopener noreferrer">
        learn react
      </a>
      <button
        onClick={async () => {
          login("","")
        }}
      >
        login
      </button>
    </div>
  );
};

export { App };
