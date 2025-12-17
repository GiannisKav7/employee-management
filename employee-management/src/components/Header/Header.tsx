import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

type HeaderProps = {
  title?: string;
};

export function Header({ title = "Employee Management" }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Link to="/" aria-label="Home" className={styles.link}>
        <h1 className={styles.title}>{title}</h1>
      </Link>
    </header>
  );
}
