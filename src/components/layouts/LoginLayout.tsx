import { Outlet } from "react-router-dom";

import { Navbar } from "../ui";

export const LoginLayout = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        <Outlet />
      </main>
    </>
  );
};
