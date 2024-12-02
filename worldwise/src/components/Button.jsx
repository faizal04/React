import styles from "./button.module.css";

function Button({ children, type, onClick }) {
  return (
    <button className={`${styles[type]} ${styles.btn}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
