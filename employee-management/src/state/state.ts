import { configureStore } from "@reduxjs/toolkit";
import searchTextReducer from "./search/searchTextSlice";
import employeesListReducer from "./employees/employeesListSlice";

export const store = configureStore({
  reducer: {
    searchText: searchTextReducer,
    employeesList: employeesListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
