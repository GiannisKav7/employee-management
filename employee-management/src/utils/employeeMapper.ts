export interface Employee {
  id: number;
  email: string;
  full_name: string;
  department: string;
  status: string;
  avatar: string;
  hireDate: string;
  notes: string;
}

export const departments = ["Engineering", "Sales", "HR", "Finance"];

export function transformUserToEmployee(user: any): Employee {
  const statuses = ["Active", "Inactive", "On Leave"];

  /**
   * FNV-1a 32-bit hash of a string.
   * Purpose: deterministically map a user key (email/id) to a numeric hash.
   * This hash is then used to derive department, status, and hire date so they vary
   * predictably across users without storing those fields.
   * Returns an unsigned 32-bit integer.
   */
  function hashString(str: string): number {
    // Deterministic hash (FNV-1a) from a string to a 32-bit unsigned int
    let hash = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619) >>> 0;
    }
    return hash;
  }

  const key = String(user.email ?? user.id ?? "");
  const hash = hashString(key);

  // Use different bits/offsets of the hash to pick department and status so they vary
  const department = departments[hash % departments.length];
  const status = statuses[(hash >>> 8) % statuses.length];
  const hireDate = new Date(
    2020 + (hash % 4),
    (hash >>> 16) % 12,
    1
  ).toISOString();
  const notes = `Employee notes for ${user.first_name ?? ""} ${
    user.last_name ?? ""
  }`.trim();
  return {
    id: user.id,
    email: user.email ?? "",
    full_name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
    department,
    status,
    avatar: user.avatar ?? "",
    hireDate,
    notes,
  };
}
