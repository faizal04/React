import PageNav from "../components/PageNAv";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/UserAuth";
import { replace, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, authorized } = useAuth();

  function handlelogin(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (authorized) {
        navigate("/app", { replace: true });
      }
    },
    [authorized, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handlelogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
