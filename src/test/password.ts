import { assert } from "chai";
import Password from "../utils/password";

describe("Password", function () {
  it("should hash a password successfully", function (done) {
    const password = new Password();
    const testPassword = "test-00";

    const hashedPassword = password.hash(testPassword);
    assert.notEqual(hashedPassword, testPassword);
    done();
  });

  it("should validate a password after hashing", function (done) {
    const password = new Password();

    const testPassword = "test-00";
    const hashedPassword = password.hash(testPassword);
    const isValid = password.compare(testPassword, hashedPassword);

    assert.equal(isValid, true);
    done();
  });

  it("should return a token successfully", function (done) {
    const password = new Password();
    const payload = {};

    const token = password.getToken(payload, "secrets");
    assert.notEqual(token, payload);
    done();
  });
});
