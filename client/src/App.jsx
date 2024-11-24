import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserProfile from "./pages/UserProfile/UserProfile";
import Login from "./pages/Login/Login";
import "./App.css";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/notFound/NotFound";

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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
