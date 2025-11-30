import type { Employee } from "../utils/employeeMapper";
import styles from "./UsersRow.module.scss";

export function UsersRow({ employee }: { employee: Employee }) {
  return (
    <>
      <div className={`${styles.cell} ${styles.name}`}>
        {employee.full_name}
      </div>
      <div className={`${styles.cell} ${styles.dept}`}>
        {employee.department}
      </div>
      <div className={`${styles.cell} ${styles.email}`}>{employee.email}</div>
      <div className={`${styles.cell} ${styles.status}`}>{employee.status}</div>
    </>
  );
}
