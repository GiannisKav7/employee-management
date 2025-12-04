import { useState, useEffect } from "react";
import { fetchAllUsers } from "./api/users";
import { UsersGrid } from "./components/UsersGrid";
import { transformUserToEmployee, type Employee } from "./utils/employeeMapper";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SearchFilterSection } from "./components/SearchFilterSection";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { EmployeeDetail } from "./components/EmployeeDetail";
import { Header } from "./components/Header";

const theme = createTheme();

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAllUsers("reqres_e0529f821acf4792958f7c8dea3c4399")
      .then((u) => {
        if (!cancelled) {
          const mappedUsers = u.map((user) => transformUserToEmployee(user));
          console.log("Mapped Users:", mappedUsers);
          setEmployees(mappedUsers);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchFilterSection />
                <UsersGrid
                  employees={employees}
                  loading={loading}
                  error={error}
                />
              </>
            }
          />
          <Route
            path="/employees/:email"
            element={<EmployeeDetail employees={employees} />}
          />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
