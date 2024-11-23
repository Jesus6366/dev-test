import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="user" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
