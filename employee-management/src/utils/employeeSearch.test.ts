import { buildSearchString } from "./employeeSearch";

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
