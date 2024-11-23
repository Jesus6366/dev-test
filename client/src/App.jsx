import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
