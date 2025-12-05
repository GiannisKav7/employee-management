import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { employeeMatchesSearch } from "../../utils/employeeSearch";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../api/users";
import { columns } from "./helpers";
import { setEmployeesList } from "../../state/employees/employeesListSlice";

import {
  transformUserToEmployee,
  type Employee,
} from "../../utils/employeeMapper";
import type { RootState } from "../../state/store";

import styles from "./UsersGrid.module.scss";

const PAGE_SIZE = 10;

export function UsersGrid() {
  const [page, setPage] = useState(0);
  const [pagedFilteredEmployeesLength, setPagedFilteredEmployeesLength] =
    useState<number>(0);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // read from Redux
  const searchText = useSelector((state: RootState) => state.searchText.text);
  const filterDept = useSelector(
    (state: RootState) => state.filterDept.selectedDepartment
  );

  const {
    data: users,
    error,
    isLoading: loading,
    isSuccess,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchAllUsers(page),
  });

  useEffect(() => {
    if (isSuccess && users && users.data.length > 0) {
      const transformedData = users.data.map((user) =>
        transformUserToEmployee(user)
      );
      setEmployees(transformedData);
      dispatch(setEmployeesList(transformedData));
    }
  }, [users, isSuccess]);

  useEffect(() => {
    let updated = [...employees]; // start with current API page

    if (searchText.length > 0) {
      updated = updated.filter((e) =>
        employeeMatchesSearch(
          { full_name: e.full_name, email: e.email },
          searchText
        )
      );
    }

    if (filterDept != null && filterDept !== "") {
      updated = updated.filter((e) => e.department === filterDept);
    }

    setFilteredEmployees(updated);
  }, [searchText, filterDept, employees]);

  useEffect(() => {
    // Reset to page 0 whenever search text or filter changes
    if (searchText || filterDept) {
      setPage(0);
      const start = page * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const pagedFilteredEmployees = filteredEmployees.slice(start, end);

      setPagedFilteredEmployeesLength(pagedFilteredEmployees.length);
    } else {
      setPagedFilteredEmployeesLength(users?.total ?? 0);
    }
  }, [searchText, filterDept, users, filteredEmployees]);

  return (
    <section className={styles.section}>
      <h2>Employees List</h2>
      {loading && <p>Loading users...</p>}
      {!loading && !error && Number(users?.total) > 0 && (
        <DataGrid
          rows={filteredEmployees}
          columns={columns}
          getRowId={(row) => row.id} // ensure unique keys across pages
          autoHeight
          density="compact"
          disableColumnMenu
          disableRowSelectionOnClick
          rowCount={pagedFilteredEmployeesLength} // total number of rows for pagination
          pagination
          paginationMode="server"
          paginationModel={{ page: page, pageSize: PAGE_SIZE }}
          initialState={{
            pagination: { paginationModel: { pageSize: PAGE_SIZE } },
          }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
          }}
          onRowClick={(params) => {
            navigate(`/employees/${encodeURIComponent(params.row.id)}`);
          }}
        />
      )}
    </section>
  );
}
