"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const password_1 = __importDefault(require("../utils/password"));
describe("Password", function () {
    it("should hash a password successfully", function (done) {
        const password = new password_1.default();
        const testPassword = "test-00";
        const hashedPassword = password.hash(testPassword);
        chai_1.assert.notEqual(hashedPassword, testPassword);
        done();
    });
    it("should validate a password after hashing", function (done) {
        const password = new password_1.default();
        const testPassword = "test-00";
        const hashedPassword = password.hash(testPassword);
        const isValid = password.compare(testPassword, hashedPassword);
        chai_1.assert.equal(isValid, true);
        done();
    });
    it("should return a token successfully", function (done) {
        const password = new password_1.default();
        const payload = {};
        const token = password.getToken(payload, "secrets");
        chai_1.assert.notEqual(token, payload);
        done();
    });
});
