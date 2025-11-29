import React from "react";
import type { User } from "../api/users";
import { UsersHeader } from "./UsersHeader";
import { UsersRow } from "./UsersRow";

export function UsersGrid({
  users,
  loading,
  error,
}: {
  users: User[];
  loading: boolean;
  error: string | null;
}) {
  return (
    <section style={{ textAlign: "left", marginTop: 24 }}>
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 2fr 1fr",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <UsersHeader />
          {users.map((u) => (
            <UsersRow key={u.id} user={u} />
          ))}
        </div>
      )}
    </section>
  );
}
