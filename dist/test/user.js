"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../entity/user");
const user_2 = __importDefault(require("../services/user"));
const user_3 = require("./__fixtures__/user");
const database_1 = require("../connection/database");
const app_1 = __importDefault(require("../app"));
const agent = supertest_1.default.agent(app_1.default);
before(function () {
    database_1.connectTestDatabase();
});
after(function () {
    database_1.disconnectTestDatabase();
});
describe("User", function () {
    it("should fail if required fields are missing", function (done) {
        const userEntity = user_1.UserEntity(user_3.missing_user_name);
        chai_1.assert.equal(userEntity.isError, true);
        done();
    });
    it("should succeed if all required fields are present", function (done) {
        const userEntity = user_1.UserEntity(user_3.first_user);
        chai_1.assert.equal(userEntity.isError, false);
        done();
    });
    it("should create a user successfully", function (done) {
        const userService = new user_2.default();
        userService.saveUser(user_3.third_user).then((response) => {
            chai_1.assert.equal(response.name, "test-3");
            done();
        });
    });
    it("should post successfully to the api to create a user", function (done) {
        agent
            .post("/api/user/create")
            .send(user_3.first_user)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200)
            .then((response) => {
            chai_1.assert.equal(response.body.success, true);
            return done();
        });
    });
    it("should authenticate a user successfully", function (done) {
        agent
            .post("/api/user/authentication")
            .send(user_3.first_user)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200)
            .then((response) => {
            chai_1.assert.equal(response.body.success, true);
            return done();
        });
    });
});
