export interface Employee {
  id: number;
  email: string;
  full_name: string;
  department: string;
  status: string;
  avatar: string;
}

export function transformUserToEmployee(user: any): Employee {
  const departments = [
    "Engineering",
    "Sales",
    "HR",
    "Finance",
    "Support",
    "Product",
  ];
  const statuses = ["Active", "Inactive", "On Leave"];

  // Deterministic hash (FNV-1a) from a string to a 32-bit unsigned int
  function hashString(str: string): number {
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
  return {
    id: Number(user.id),
    email: user.email ?? "",
    full_name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
    department,
    status,
    avatar: user.avatar ?? "",
  };
}
