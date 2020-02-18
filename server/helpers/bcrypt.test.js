const { comparePassword, hashPassword } = require('./bcrypt');

const password = "secret";
let hashedPassword = null;

describe("bcrypt test", () => {
  it("Should create hashedPassword", () => {
    hashedPassword = hashPassword(password);
    expect(typeof hashedPassword).toBe("string");
  });
  it("Should compare password", () => {
    expect(comparePassword(password, hashedPassword)).toBe(true);
  });
});