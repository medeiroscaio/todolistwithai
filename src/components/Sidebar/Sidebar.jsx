import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import icon from "../../assets/icon.png";
import alison from "../../assets/alison.jpg";
import tasks from "../../assets/tasks.svg";
import today from "../../assets/today.svg";
import upcoming from "../../assets/upcoming.svg";
import ask from "../../assets/ask.svg";
import logout from "../../assets/logout.svg";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    setUser({
      username: localStorage.getItem("userName") || "Guest",
      email: localStorage.getItem("userEmail") || "No email available",
    });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("Access Token");

      setUser({ username: "", email: "" });

      navigate("/");
    } catch (error) {
      console.error(
        "Erro ao realizar logout:",
        error.response?.data?.message || error.message
      );
    }
  };
  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <div className="logoContainer">
          <img src={icon} alt="Leafgreen logo" className="logo" />
          <h2 className="title">leafgreen.</h2>
        </div>
        <div className="profileContainer">
          <img src={alison} alt="User profile picture" className="profile" />
          <div className="profileContents">
            <p className="name">Hello, {user.username}!</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="contentsContainer">
          <ul>
            <li className={location.pathname === "/tasks" ? "active" : ""}>
              <img src={tasks} alt="Tasks icon" />
              <Link to="/tasks">Tasks</Link>
            </li>
            <li className={location.pathname === "/today" ? "active" : ""}>
              <img src={today} alt="Today's tasks icon" />
              <Link to="/today">Today</Link>
            </li>
            <li className={location.pathname === "/upcoming" ? "active" : ""}>
              <img src={upcoming} alt="Upcoming tasks icon" />
              <Link to="/upcoming">Upcoming</Link>
            </li>
            <li className={location.pathname === "/ask" ? "active" : ""}>
              <img src={ask} alt="AI assistant icon" />
              <Link to="/ask">Ask to AI</Link>
            </li>
            <li>
              <img src={logout} alt="Logout icon" />
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
