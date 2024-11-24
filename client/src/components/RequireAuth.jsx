import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // is user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // if it is render the children in this case the UserProfile component

  return children;
};

export default RequireAuth;
