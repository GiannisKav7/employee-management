import { UsersGrid } from "./components/UsersGrid/UsersGrid";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SearchFilterSection } from "./components/SearchFilterSection/SearchFilterSection";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { EmployeeDetails } from "./components/EmployeeDetails/EmployeeDetails";
import { Header } from "./components/Header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme();

function AppShell() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchFilterSection />
                <UsersGrid />
              </>
            }
          />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// Export a component that provides the store above AppShell
function App() {
  return (
    <Provider store={store}>
      <AppShell />
    </Provider>
  );
}

export default App;
