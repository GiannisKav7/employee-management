import type { GridColDef } from "@mui/x-data-grid/models/colDef";
import type { Employee } from "../../../utils/employeeMapper";

export const columns: GridColDef<Employee>[] = [
  { field: "full_name", headerName: "Full Name", flex: 1.4, minWidth: 180 },
  { field: "department", headerName: "Department", flex: 1, minWidth: 140 },
  { field: "email", headerName: "Email", flex: 1.6, minWidth: 220 },
  { field: "status", headerName: "Status", flex: 0.8, minWidth: 120 },
];
