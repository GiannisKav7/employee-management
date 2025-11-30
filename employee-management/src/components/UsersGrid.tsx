import styles from "./UsersGrid.module.scss";
import type { Employee } from "../utils/employeeMapper";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { employeeMatchesSearch } from "../utils/employeeSearch";
import type { RootState } from "../state/store";

export function UsersGrid({
  employees: employees,
  loading,
  error,
}: {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}) {
  // read search text from Redux
  const searchText = useSelector((state: RootState) => state.searchText.text);
  const filteredEmployees =
    searchText.length === 0
      ? employees
      : employees.filter((e) =>
          employeeMatchesSearch(
            { full_name: e.full_name, email: e.email },
            searchText
          )
        );

  const columns: GridColDef<Employee>[] = [
    { field: "full_name", headerName: "Full Name", flex: 1.4, minWidth: 180 },
    { field: "department", headerName: "Department", flex: 1, minWidth: 140 },
    { field: "email", headerName: "Email", flex: 1.6, minWidth: 220 },
    { field: "status", headerName: "Status", flex: 0.8, minWidth: 120 },
  ];

  return (
    <section className={styles.section}>
      <h2>Employees List</h2>
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
      {!loading && !error && (
        <DataGrid
          rows={filteredEmployees}
          columns={columns}
          getRowId={(row) => row.email} // ensure unique keys across pages
          autoHeight
          density="compact"
          disableColumnMenu
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      )}
    </section>
  );
}
