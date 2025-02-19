import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Tasks from "./pages/Tasks";
import Today from "./pages/Today";
import Ask from "./pages/Ask";
import Upcoming from "./pages/Upcoming";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout/ProtectedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/today" element={<Today />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/ask" element={<Ask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
