import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import styles from "./FilterDepartment.module.scss";
import { useEffect } from "react";
import { departments } from "../utils/employeeMapper";
import { useDispatch, useSelector } from "react-redux";
import { setDepartmentFilter } from "../state/filter/filterDeptSlice";

export function FilterDepartment() {
  const department = useSelector(
    (state: any) => state.filterDept?.selectedDepartment ?? ""
  );
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    if (value === "All") {
      dispatch(setDepartmentFilter(null));
      localStorage.removeItem("selectedDepartment");
    } else {
      dispatch(setDepartmentFilter(value));
      localStorage.setItem("selectedDepartment", value);
    }
  };

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
