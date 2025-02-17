import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route path="/Home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
