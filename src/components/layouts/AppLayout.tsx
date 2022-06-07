import { Outlet } from "react-router-dom";

import { Navbar, Sidemenu } from "../ui";

export const AppLayout = () => {
  return (
    <>
      {/* <head>
            <title>{ title }</title>
            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ description } />
        </head> */}
      <nav>
        <Navbar />
      </nav>
      <Sidemenu />
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
