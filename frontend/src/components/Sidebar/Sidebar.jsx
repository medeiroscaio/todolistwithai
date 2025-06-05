import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import ProfileImageUploader from "../ProfileImageUploader/ProfileImageUploader";
import axios from "axios";
import icon from "../../assets/icon.png";
import defaultIcon from "../../assets/defaultIcon.jpg";
import tasks from "../../assets/tasks.svg";
import today from "../../assets/today.svg";
import upcoming from "../../assets/upcoming.svg";
import ask from "../../assets/ask.svg";
import logout from "../../assets/logout.svg";
import { localURL } from "../assets/httpService/httpService"; // ajuste o caminho conforme necessário
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    profileImage: defaultIcon,
  });

  useEffect(() => {
    setUser({
      username: localStorage.getItem("userName") || "Guest",
      email: localStorage.getItem("userEmail") || "No email available",
      profileImage: localStorage.getItem("userImage") || defaultIcon,
    });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `http://${localURL}:5000/api/users/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userImage");

      setUser({ username: "", email: "", profileImage: defaultIcon });
      navigate("/");
    } catch (error) {
      console.error(
        "Erro ao realizar logout:",
        error.response?.data?.message || error.message
      );
    }
  };
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const updateProfileImage = (newImage) => {
    setUser((prevUser) => ({
      ...prevUser,
      profileImage: newImage,
    }));
    localStorage.setItem("userImage", newImage);
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <div className="logoContainer">
          <img src={icon} alt="Leafgreen logo" className="logo" />
          <h2 className="title">leafgreen.</h2>
        </div>
        <div className="profileContainer">
          <div
            className="profile-avatar"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={user.profileImage}
              alt="User profile"
              className="profile"
              style={{ cursor: "pointer" }}
            />
          </div>
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
      <ProfileImageUploader
        setImageProfile={updateProfileImage}
        fileInputRef={fileInputRef}
        modalIsOpen={modalIsOpen}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        onProfileImageUpdate={updateProfileImage}
      />
    </div>
  );
};

export default Sidebar;
