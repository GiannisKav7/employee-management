import { type SelectChangeEvent } from "@mui/material";
import type { Dispatch } from "redux";
import { setDepartmentFilter } from "../../../state/filter/filterDeptSlice";

type useFilterDepartmentHandlerProps = {
  dispatch: Dispatch;
};

export const useFilterDepartmentHandler = ({
  dispatch,
}: useFilterDepartmentHandlerProps) => {
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
  return handleChange;
};
