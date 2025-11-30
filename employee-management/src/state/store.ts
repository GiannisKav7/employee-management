import { configureStore } from "@reduxjs/toolkit";
import searchTextReducer from "./search/searchTextSlice";
import employeesListReducer from "./employees/employeesListSlice";
import filterDeptReducer from "./filter/filterDeptSlice";

export const store = configureStore({
  reducer: {
    searchText: searchTextReducer,
    employeesList: employeesListReducer,
    filterDept: filterDeptReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
