import { Link, useParams } from "react-router-dom";
import type { Employee } from "../utils/employeeMapper";
import styles from "./EmployeeDetail.module.scss";

export function EmployeeDetail({ employees }: { employees: Employee[] }) {
  const { email } = useParams();
  const decodedEmail = email ? decodeURIComponent(email) : "";
  const employee = employees.find((e) => e.email === decodedEmail);

  if (!employee) {
    return <div className={styles.container}>Employee not found.</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{employee.full_name}</h2>
      <p className={styles.field}>
        <span className={styles.label}>Email:</span>
        <span className={styles.value}>{employee.email}</span>
      </p>
      <p className={styles.field}>
        <span className={styles.label}>Department:</span>
        <span className={styles.value}>{employee.department}</span>
      </p>
      <p className={styles.field}>
        <span className={styles.label}>Status:</span>
        <span className={styles.value}>{employee.status}</span>
      </p>
      <p className={styles.field}>
        <span className={styles.label}>Hire Date:</span>
        <span className={styles.value}>{employee.hireDate.toDateString()}</span>
      </p>
      <p className={styles.field}>
        <span className={styles.label}>Notes:</span>
        <span className={styles.value}>{employee.notes}</span>
      </p>
      <Link to="/" className={styles.backLink}>
        Back to employee list
      </Link>
    </div>
  );
}
