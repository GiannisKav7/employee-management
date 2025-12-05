export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersResponse {
  data: User[];
  total: number;
}

export async function fetchUsers(page = 0): Promise<UsersResponse> {
  const headers: Record<string, string> = {};
  const apiKey = import.meta.env.VITE_API_KEY;
  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }

  const res = await fetch(
    `https://reqres.in/api/users?page=${page + 1}&per_page=10`,
    {
      headers,
    }
  );
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
  const data = await res.json();
  return { data: data.data, total: data.total };
}

export async function fetchAllUsers(page: number): Promise<UsersResponse> {
  return await fetchUsers(page);
}
