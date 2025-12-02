import { Link, useParams } from "react-router-dom";
import type { Employee } from "../utils/employeeMapper";

export function EmployeeDetail({ employees }: { employees: Employee[] }) {
  const { email } = useParams();
  const decodedEmail = email ? decodeURIComponent(email) : "";
  const employee = employees.find((e) => e.email === decodedEmail);

  if (!employee) {
    return <div style={{ padding: 16 }}>Employee not found.</div>;
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>{employee.full_name}</h2>
      <p>Email: {employee.email}</p>
      <p>Department: {employee.department}</p>
      <p>Status: {employee.status}</p>
      <p>Hire Date: {employee.hireDate.toDateString()}</p>
      <p>Notes: {employee.notes}</p>
      <Link to="/">Back to employee list</Link>
    </div>
  );
}
