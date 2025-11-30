import { useState, useEffect } from "react";
import { fetchAllUsers, fetchUsers } from "./api/users";
import { UsersGrid } from "./components/UsersGrid";
import { transformUserToEmployee, type Employee } from "./utils/employeeMapper";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Search } from "./components/Search";
import { Provider } from "react-redux";
import { store } from "./state/state";

const theme = createTheme();

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAllUsers("reqres-free-v1")
      .then((u) => {
        if (!cancelled) {
          const mappedUsers = u.map((user) => transformUserToEmployee(user));
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
        <Search />
        <UsersGrid employees={employees} loading={loading} error={error} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
