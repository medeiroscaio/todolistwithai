import React from "react";
import { useLocation } from "react-router-dom";
import icon from "../../assets/icon.png";
import alison from "../../assets/alison.jpg";
import tasks from "../../assets/tasks.svg";
import today from "../../assets/today.svg";
import upcoming from "../../assets/upcoming.svg";
import ask from "../../assets/ask.svg";

import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <div className="logoContainer">
          <img src={icon} alt="icon" className="logo" />
          <h2 className="title">leafgreen.</h2>
        </div>
        <div className="profileContainer">
          <img src={alison} alt="profile" className="profile" />
          <div className="profileContents">
            <p className="name">Hello, John👋</p>
            <p>johnsmith@gmail.com</p>
          </div>
        </div>
        <div className="contentsContainer">
          <ul>
            <li className={location.pathname === "/tasks" ? "active" : ""}>
              <img src={tasks} alt="tasksicon" />
              <a href="/tasks">Tasks</a>
            </li>
            <li className={location.pathname === "/today" ? "active" : ""}>
              <img src={today} alt="todayicon" />
              <a href="/today">Today</a>
            </li>
            <li className={location.pathname === "/upcoming" ? "active" : ""}>
              <img src={upcoming} alt="upcomingicon" />
              <a href="/upcoming">Upcoming</a>
            </li>
            <li className={location.pathname === "/ask" ? "active" : ""}>
              <img src={ask} alt="askicon" />
              <a href="/ask">Ask to AI</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
