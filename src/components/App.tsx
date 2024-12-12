import React, { FC } from "react";
import { products, login, me } from "@/api";

const App: FC = () => {
  return (
    <div className="App">
      <img src={"/logo.svg"} alt="" srcSet="" />
      <a href="/" target="_blank" rel="noopener noreferrer">
        learn react
      </a>
      <button
        onClick={async () => {
          const x = await login();
          const y = await me(x.accessToken);
          console.log(y);
          console.log(y.age);
        }}
      >
        login
      </button>
    </div>
  );
};

export { App };
