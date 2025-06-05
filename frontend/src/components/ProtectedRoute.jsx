import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { localURL } from "../assets/httpService/httpService"; // ajuste o caminho conforme necessário

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios
      .get(`${localURL}:5000/api/tasks`, { withCredentials: true })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
