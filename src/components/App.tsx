import React, { FC } from "react";
import { products, login, me, refresh } from "@/api";

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
          const z = await refresh(x.refreshToken);
          console.log(y);
          console.log(y.age);
          console.log(z);
        }}
      >
        login
      </button>
    </div>
  );
};

export { App };
