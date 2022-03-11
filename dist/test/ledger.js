"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const ledger_1 = require("../entity/ledger");
const user_1 = __importDefault(require("../services/user"));
const ledger_2 = __importDefault(require("../services/ledger"));
const ledger_3 = __importDefault(require("../utils/ledger"));
const ledger_4 = require("./__fixtures__/ledger");
const user_2 = require("./__fixtures__/user");
const database_1 = require("../connection/database");
const app_1 = __importDefault(require("../app"));
const agent = supertest_1.default.agent(app_1.default);
let authToken;
let user;
let currentDate = new Date().toISOString();
before(function () {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.connectTestDatabase();
        const userService = new user_1.default();
        user = yield userService.saveUser(user_2.second_user);
        authToken = yield userService.authentication(user_2.second_user, process.env.SECRET || "secrets");
    });
});
after(function () {
    database_1.disconnectTestDatabase();
});
describe("Ledger", function () {
    it("should fail if required fields are missing", function (done) {
        const ledgerEntity = ledger_1.LedgerEntity(ledger_4.no_user_ledger);
        chai_1.assert.equal(ledgerEntity.isError, true);
        done();
    });
    it("should succeed if all required fields are present", function (done) {
        const ledgerEntity = ledger_1.LedgerEntity(ledger_4.ledger);
        chai_1.assert.equal(ledgerEntity.isError, false);
        done();
    });
    it("should create a ledger successfully", function (done) {
        const ledgerService = new ledger_2.default();
        ledgerService.saveLedger(ledger_4.ledger, 15, 5).then((response) => {
            chai_1.assert.equal(response.usd, 6);
            done();
        });
    });
    it("should convert the token successfully to usd equivalent", function (done) {
        const ledgerService = new ledger_3.default();
        const usdEquivalent = ledgerService.currencyConversion(2, 15);
        chai_1.assert.equal(usdEquivalent, 30);
        done();
    });
    it("should get the total stats successfully", function (done) {
        const ledgerService = new ledger_3.default();
        const stats = ledgerService.getStatistics([ledger_4.maximum_token_ledger]);
        chai_1.assert.equal(parseFloat(stats.totalToken), 5);
        done();
    });
    it("should show response with attributes of only allowed fields", function (done) {
        const ledgerService = new ledger_3.default();
        const response = ledgerService.responseWithAllowedFields([ledger_4.ledger], ["token", "createdAt"]);
        chai_1.assert.equal(response[0].usd, undefined);
        done();
    });
    it("should post to the api to create a ledger successfully", function (done) {
        agent
            .post("/api/ledger/create")
            .send(ledger_4.ledger)
            .set("Authorization", "Bearer " + authToken)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200)
            .then((response) => {
            chai_1.assert.equal(response.body.success, true);
            return done();
        });
    });
    it("should fail if the total token has exceeded the daily maximum allowed token", function (done) {
        agent
            .post("/api/ledger/create")
            .send(ledger_4.maximum_token_ledger)
            .set("Authorization", "Bearer " + authToken)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(422)
            .then((response) => {
            chai_1.assert.equal(response.body.success, false);
            return done();
        });
    });
    it("should fetch the current user token history", function (done) {
        const ledgerService = new ledger_2.default();
        ledgerService.currentUserTokenHistory(user.id).then((response) => {
            chai_1.assert.isAbove(response.length, 0);
            return done();
        });
    });
    it("should post to the api to fetch the current user token history", function (done) {
        agent
            .get(`/api/ledger/current/token/history/${user.id}`)
            .set("Authorization", "Bearer " + authToken)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200)
            .then((response) => {
            chai_1.assert.equal(response.body.success, true);
            return done();
        });
    });
    it("should fetch the current user usd history", function (done) {
        const ledgerService = new ledger_2.default();
        ledgerService.currentUserUSDHistory(user.id).then((response) => {
            chai_1.assert.isAbove(response.length, 0);
            return done();
        });
    });
    it("should post to the api to fetch the current user usd history", function (done) {
        agent
            .get(`/api/ledger/current/usd/history/${user.id}`)
            .set("Authorization", "Bearer " + authToken)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200)
            .then((response) => {
            chai_1.assert.equal(response.body.success, true);
            return done();
        });
    });
    it("should fetch the current transaction stats successfully", function (done) {
        agent
            .get(`/api/ledger/current/user/stats/${user.id}`)
            .set("Authorization", "Bearer " + authToken)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200)
            .then((response) => {
            chai_1.assert.equal(response.body.success, true);
            return done();
        });
    });
    it("should fetch the user ledger based on specified date", function (done) {
        const ledgerService = new ledger_2.default();
        ledgerService
            .userTransactionHistory(user.id, currentDate)
            .then((response) => {
            chai_1.assert.isAbove(response.length, 0);
            return done();
        });
    });
    it("should post an api request to fetch the user ledger based on specified date", function (done) {
        agent
            .get(`/api/ledger/user/history?user=${user.id}&date=${currentDate}`)
            .set("Authorization", "Bearer " + authToken)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200)
            .then((response) => {
            chai_1.assert.equal(response.body.success, true);
            return done();
        });
    });
    it("should fail to fetch the user ledger if requested date is missing", function (done) {
        agent
            .get(`/api/ledger/user/history?user=${user.id}`)
            .set("Authorization", "Bearer " + authToken)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(422)
            .then((response) => {
            chai_1.assert.equal(response.body.success, false);
            return done();
        });
    });
    it("should fail to fetch the user ledger if user name is missing", function (done) {
        agent
            .get(`/api/ledger/user/history?date=${currentDate}`)
            .set("Authorization", "Bearer " + authToken)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(422)
            .then((response) => {
            chai_1.assert.equal(response.body.success, false);
            return done();
        });
    });
});
