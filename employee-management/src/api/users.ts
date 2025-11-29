export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export async function fetchUsers(page = 1, apiKey?: string): Promise<User[]> {
  const headers: Record<string, string> = {};
  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }

  const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
    headers,
  });
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
  const data = await res.json();
  return data.data as User[];
}
