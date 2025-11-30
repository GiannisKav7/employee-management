import { createSlice } from "@reduxjs/toolkit";
import { type Employee } from "../../utils/employeeMapper";

interface EmployeesListState {
  employees: Employee[];
}

const initialEmployeesState: EmployeesListState = {
  employees: [],
};

const employeesListSlice = createSlice({
  name: "employeesList",
  initialState: initialEmployeesState,
  reducers: {
    setEmployeesList(state, action: { payload: Employee[] }) {
      state.employees = action.payload;
    },
  },
});

export const { setEmployeesList } = employeesListSlice.actions;
export default employeesListSlice.reducer;
