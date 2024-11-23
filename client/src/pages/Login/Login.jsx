import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <img src="../src/assets/logo.png" alt="" className={styles.logo} />
      <form>
        <div className={styles.loginContainer}>
          <div>
            <label>Email</label>
            <input type="email" className={styles.input} />
            <label>Password</label>
            <input type="password" className={styles.input} />
          </div>
          <div className={styles.btnContainer}>
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
