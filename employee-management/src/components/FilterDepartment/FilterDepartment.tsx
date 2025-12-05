import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { departments } from "../../utils/employeeMapper";
import { useDispatch, useSelector } from "react-redux";
import { setDepartmentFilter } from "../../state/filter/filterDeptSlice";
import { useFilterDepartmentHandler } from "./handlers/useFilterDepartmentHandler";

import styles from "./FilterDepartment.module.scss";

export function FilterDepartment() {
  const department = useSelector(
    (state: any) => state.filterDept?.selectedDepartment ?? ""
  );
  const dispatch = useDispatch();

  const { handleChange } = useFilterDepartmentHandler({ dispatch });

  useEffect(() => {
    const dept = localStorage.getItem("selectedDepartment");
    if (dept && dept !== "All") {
      dispatch(setDepartmentFilter(dept));
    } else {
      dispatch(setDepartmentFilter(null));
    }
  }, [dispatch]);

  return (
    <div className={styles.departmentFilter}>
      <FormControl fullWidth className={styles.formControl}>
        <InputLabel id="department-select-label">Department</InputLabel>
        <Select
          labelId="department-select-label"
          id="department-select"
          value={department || "All"}
          label="Department"
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => (selected ? (selected as string) : "All")}
          variant="outlined"
        >
          <MenuItem value="All">
            <em>All</em>
          </MenuItem>
          {departments.map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
