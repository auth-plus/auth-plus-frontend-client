import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";

export const Layout: React.FunctionComponent = (props) => {
  return (
    <>
      <Header />
      <Menu />
      <Footer />
    </>
  );
};

export default Layout;
