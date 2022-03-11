import { assert } from "chai";
import request from "supertest";
import { UserEntity } from "../entity/user";
import UserService from "../services/user";
import { missing_user_name, first_user, third_user } from "./__fixtures__/user";
import {
  connectTestDatabase,
  disconnectTestDatabase,
} from "../connection/database";
import app from "../app";

const agent = request.agent(app);

before(function () {
  connectTestDatabase();
});

after(function () {
  disconnectTestDatabase();
});

describe("User", function () {
  it("should fail if required fields are missing", function (done) {
    const userEntity = UserEntity(missing_user_name);

    assert.equal(userEntity.isError, true);
    done();
  });

  it("should succeed if all required fields are present", function (done) {
    const userEntity = UserEntity(first_user);

    assert.equal(userEntity.isError, false);
    done();
  });

  it("should create a user successfully", function (done) {
    const userService = new UserService();
    userService.saveUser(third_user).then((response) => {
      assert.equal(response.name, "test-3");
      done();
    });
  });

  it("should post successfully to the api to create a user", function (done) {
    agent
      .post("/api/user/create")
      .send(first_user)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .then((response) => {
        assert.equal(response.body.success, true);
        return done();
      });
  });

  it("should authenticate a user successfully", function (done) {
    agent
      .post("/api/user/authentication")
      .send(first_user)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .then((response) => {
        assert.equal(response.body.success, true);
        return done();
      });
  });
});
