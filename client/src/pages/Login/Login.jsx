import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(password);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    try {
      const response = await fetch("http://localhost:5000/api/login", {
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
      navigate("/user");

      console.log(user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <img src="../src/assets/logo.png" alt="" className={styles.logo} />
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
