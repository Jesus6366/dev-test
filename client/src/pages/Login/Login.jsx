import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(password);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api/users/login'
  : 'https://dev-test-jesus.netlify.app/api/users/login';

// fetch(API_URL, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(loginData)
// })

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials try again");
      }

      const user = await response.json();

      // storing the authenticated user in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/user"); // redirect to the user profile page

      console.log(user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="Company Logo" className={styles.logo} />
      <form onSubmit={handleLogin}>
        <div className={styles.loginContainer}>
          <div>
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              value={email}
            />
            <label>Password</label>
            <input
              type="password"
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.btnContainer}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button className={styles.btn} type="submit">
              LOGIN
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
