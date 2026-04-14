import React from "react";
import Header from "../../partials/Header";
import { navList } from "./nav-function";
import Navigation from "../../partials/Navigation";

const Layout = ({ children, menu = "", submenu = "" }) => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Navigation */}
      <Navigation navigationList={navList} menu={menu} submenu={navList} />
      {/* Body */}
      <div className="wrapper">{children}</div>
    </>
  );
};

export default Layout;
