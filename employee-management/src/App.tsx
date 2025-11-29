import { useState, useEffect } from "react";
import "./App.css";
import { fetchUsers, type User } from "./api/users";
import { UsersGrid } from "./components/UsersGrid";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchUsers(1)
      .then((u) => {
        if (!cancelled) setUsers(u);
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
    <>
      <UsersGrid users={users} loading={loading} error={error} />
    </>
  );
}

export default App;
