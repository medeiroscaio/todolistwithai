import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "../ProtectedLayout/ProtectedLayout.css";

const ProtectedLayout = () => {
  return (
    <div className="protected-layout">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
