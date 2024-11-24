import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserProfile from "./pages/UserProfile/UserProfile";
import Login from "./pages/Login/Login";
import "./App.css";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/user"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
