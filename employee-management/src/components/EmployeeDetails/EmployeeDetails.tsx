import { Link, useParams } from "react-router-dom";
import styles from "./EmployeeDetails.module.scss";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { DataRow } from "../DataRow/DataRow";

export function EmployeeDetails() {
  const { id } = useParams();

  const employees = useSelector(
    (state: any) => state.employeesList.employees ?? []
  ); // adjust selector to your store shape

  const decodedId = useMemo(() => (id ? decodeURIComponent(id) : ""), [id]);

  const employee = useMemo(() => {
    return employees?.find((e: any) => e.id == decodedId);
  }, [employees, decodedId]);
  if (!employee) {
    return <div className={styles.container}>Employee not found.</div>;
  }

  // Safely handle non-Date hireDate values
  const hireDateStr =
    employee.hireDate instanceof Date
      ? employee.hireDate.toDateString()
      : new Date(employee.hireDate).toDateString();

  // Pick a best-effort avatar source
  const avatarSrc =
    employee.avatarUrl ?? employee.photoUrl ?? employee.avatar ?? null;

  return (
    <div className={styles.container}>
      {avatarSrc && (
        <img
          src={avatarSrc}
          alt={`${employee.full_name}'s avatar`}
          className={styles.avatar}
        />
      )}
      <h2 className={styles.title}>{employee.full_name}</h2>
      <StatusBadge status={employee.status} />
      <DataRow label="Email" value={employee.email} />
      <DataRow label="Department" value={employee.department} />

      <DataRow label="Hire Date" value={hireDateStr} />
      <DataRow label="Notes" value={employee.notes} />

      <Link to="/" className={styles.backLink}>
        Back to employee list
      </Link>
    </div>
  );
}
