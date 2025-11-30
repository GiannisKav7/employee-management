import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import styles from "./FilterDepartment.module.scss";

interface FilterDepartmentProps {
  department?: string;
  onDepartmentChange: (department: string) => void;
}

export function FilterDepartment({
  department,
  onDepartmentChange,
}: FilterDepartmentProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onDepartmentChange(event.target.value as string);
  };

  return (
    <div className={styles.departmentFilter}>
      <FormControl fullWidth className={styles.formControl}>
        <InputLabel id="department-select-label">Department</InputLabel>
        <Select
          labelId="department-select-label"
          id="department-select"
          value={department}
          label="Department"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Product">Product</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          <MenuItem value="Support">Support</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
