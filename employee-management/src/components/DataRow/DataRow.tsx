import styles from "./DataRow.module.scss";

interface DataRowProps {
  label: string;
  value: string;
}

export function DataRow({ label, value }: DataRowProps) {
  return (
    <p className={styles.field}>
      <span className={styles.label}>{label}:</span>
      <span className={styles.value}>{value}</span>
    </p>
  );
}
