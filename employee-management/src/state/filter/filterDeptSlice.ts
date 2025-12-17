import { createSlice } from "@reduxjs/toolkit";

interface FilterDeptState {
  selectedDepartment: string | null;
}

const initialState: FilterDeptState = {
  selectedDepartment: null,
};

const filterDeptSlice = createSlice({
  name: "filterDept",
  initialState,
  reducers: {
    setDepartmentFilter(state, action: { payload: string | null }) {
      state.selectedDepartment = action.payload;
    },
  },
});

export const { setDepartmentFilter } = filterDeptSlice.actions;
export default filterDeptSlice.reducer;
