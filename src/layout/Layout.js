import React from "react";
import SideBar from "../Components/sidebar/SideBar";
import "./Layout.css";
const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      {children}
      <SideBar />
    </div>
  );
};

export default Layout;
