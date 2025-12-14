import {
  buildSearchString,
  normalizeSearchInput,
  employeeMatchesSearch,
} from "./employeeSearch";

describe("buildSearchString", () => {
  it("should concatenate full_name and email in lowercase", () => {
    const employee = {
      full_name: "John Doe",
      email: "john.doe@example.com",
    };
    const result = buildSearchString(employee);
    expect(result).toBe("john doe john.doe@example.com");
  });
});

describe("normalizeSearchInput", () => {
  it("trims and lowercases input", () => {
    expect(normalizeSearchInput("  John DOE ")).toBe("john doe");
  });
});

describe("employeeMatchesSearch", () => {
  const employee = { full_name: "Jane Smith", email: "jane.smith@example.com" };

  it("matches when search term is in full_name", () => {
    expect(employeeMatchesSearch(employee, "jane")).toBe(true);
  });

  it("matches when search term is in email", () => {
    expect(employeeMatchesSearch(employee, "example.com")).toBe(true);
  });

  it("is case-insensitive and ignores leading/trailing spaces", () => {
    expect(employeeMatchesSearch(employee, "  SMITH ")).toBe(true);
  });

  it("returns false when term is not present", () => {
    expect(employeeMatchesSearch(employee, "notfound")).toBe(false);
  });
});
