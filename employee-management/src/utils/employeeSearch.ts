export function normalizeSearchInput(input: string): string {
  return input.trim().toLowerCase();
}

export function buildSearchString(employee: {
  full_name: string;
  email: string;
}): string {
  return `${employee.full_name} ${employee.email}`.toLowerCase();
}
export function employeeMatchesSearch(
  employee: { full_name: string; email: string },
  searchInput: string
) {
  const searchString = buildSearchString(employee);
  const normalizedSearchInput = normalizeSearchInput(searchInput);
  return searchString.includes(normalizedSearchInput);
}
