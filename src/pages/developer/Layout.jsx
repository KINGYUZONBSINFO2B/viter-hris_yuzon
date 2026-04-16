import React from "react";
import Header from "../../partials/Header";
import { navList } from "./nav-function";
import Navigation from "../../partials/Navigation";
import ModalSuccess from "../../partials/modals/ModalSuccess";
import { StoreContext } from "../../store/StoreContext";

const Layout = ({ children, menu = "", submenu = "" }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      {/* Header */}
      <Header />
      {/* Navigation */}
      <Navigation navigationList={navList} menu={menu} submenu={navList} />
      {/* Body */}
      <div className="wrapper">{children}</div>

      {/* Modal Success */}

      {store.success && <ModalSuccess />}
    </>
  );
};

export default Layout;
