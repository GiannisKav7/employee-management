import { useEffect, useState } from "react";
import { fetchUsers, type User } from "../api/users";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchUsers(1, "reqres-free-v1")
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

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "crimson" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((u) => (
          <li
            key={u.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <img
              src={u.avatar}
              alt={`${u.first_name} ${u.last_name}`}
              width={48}
              height={48}
              style={{ borderRadius: 24 }}
            />
            <div>
              <div>
                {u.first_name} {u.last_name}
              </div>
              <small>{u.email}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
