import React from "react";
import type { User } from "../api/users";

export function UsersRow({ user }: { user: User }) {
  return (
    <>
      <div>
        {user.first_name} {user.last_name}
      </div>
      <div>—</div>
      <div>{user.email}</div>
      <div>—</div>
    </>
  );
}
