import styles from "./Header.module.css";

type HeaderProps = {
  title?: string;
};

export function Header({ title = "Employee Management" }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
