const User = require("../../models/schemas/userSchema");
const { Register } = require("../userRegister");
const axios = require("axios");

describe("Creating User", () => {
  it("Should not create a user with same email and throw error when email is not unique", async () => {
    User.findOne = jest.fn().mockImplementation(() => {
      return {
        email: "test@gmail.com",
      };
    });

    User.save = jest.fn().mockImplementation(() => {});

    await expect(
      Register("test@gmail.com", "test2@gmail.com", "test3@gmail.com")
    ).rejects.toThrowError();
  });
});

describe("The router", () => {
  test("The login route with the user", async () => {
    const res = await axios.post(`http://localhost:9000/user/login`, {
      email: "yes@gmail.com",
      password: "123456",
    });

    expect(res.status).toBe(200);
  });
});
