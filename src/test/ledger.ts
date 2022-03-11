import { assert } from "chai";
import request from "supertest";
import { LedgerEntity } from "../entity/ledger";
import UserService from "../services/user";
import LedgerService from "../services/ledger";
import Ledger from "../utils/ledger";
import {
  no_user_ledger,
  ledger,
  maximum_token_ledger,
} from "./__fixtures__/ledger";
import { second_user } from "./__fixtures__/user";
import {
  connectTestDatabase,
  disconnectTestDatabase,
} from "../connection/database";
import app from "../app";

const agent = request.agent(app);

let authToken: string;
let user: Record<string, string>;
let currentDate = new Date().toISOString();

before(async function () {
  connectTestDatabase();

  const userService = new UserService();
  user = await userService.saveUser(second_user);
  authToken = await userService.authentication(
    second_user,
    process.env.SECRET || "secrets"
  );
});

after(function () {
  disconnectTestDatabase();
});

describe("Ledger", function () {
  it("should fail if required fields are missing", function (done) {
    const ledgerEntity = LedgerEntity(no_user_ledger);

    assert.equal(ledgerEntity.isError, true);
    done();
  });

  it("should succeed if all required fields are present", function (done) {
    const ledgerEntity = LedgerEntity(ledger);

    assert.equal(ledgerEntity.isError, false);
    done();
  });

  it("should create a ledger successfully", function (done) {
    const ledgerService = new LedgerService();
    ledgerService.saveLedger(ledger, 15, 5).then((response) => {
      assert.equal(response.usd, 6);
      done();
    });
  });

  it("should convert the token successfully to usd equivalent", function (done) {
    const ledgerService = new Ledger();
    const usdEquivalent = ledgerService.currencyConversion(2, 15);
    assert.equal(usdEquivalent, 30);
    done();
  });

  it("should get the total stats successfully", function (done) {
    const ledgerService = new Ledger();
    const stats = ledgerService.getStatistics([maximum_token_ledger]);
    assert.equal(parseFloat(stats.totalToken), 5);
    done();
  });

  it("should show response with attributes of only allowed fields", function (done) {
    const ledgerService = new Ledger();
    const response = ledgerService.responseWithAllowedFields(
      [ledger],
      ["token", "createdAt"]
    );
    assert.equal(response[0].usd, undefined);
    done();
  });

  it("should post to the api to create a ledger successfully", function (done) {
    agent
      .post("/api/ledger/create")
      .send(ledger)
      .set("Authorization", "Bearer " + authToken)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .then((response) => {
        assert.equal(response.body.success, true);
        return done();
      });
  });

  it("should fail if the total token has exceeded the daily maximum allowed token", function (done) {
    agent
      .post("/api/ledger/create")
      .send(maximum_token_ledger)
      .set("Authorization", "Bearer " + authToken)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(422)
      .then((response) => {
        assert.equal(response.body.success, false);
        return done();
      });
  });

  it("should fetch the current user token history", function (done) {
    const ledgerService = new LedgerService();
    ledgerService.currentUserTokenHistory(user.id).then((response) => {
      assert.isAbove(response.length, 0);
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
        assert.equal(response.body.success, true);
        return done();
      });
  });

  it("should fetch the current user usd history", function (done) {
    const ledgerService = new LedgerService();
    ledgerService.currentUserUSDHistory(user.id).then((response) => {
      assert.isAbove(response.length, 0);
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
        assert.equal(response.body.success, true);
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
        assert.equal(response.body.success, true);
        return done();
      });
  });

  it("should fetch the user ledger based on specified date", function (done) {
    const ledgerService = new LedgerService();
    ledgerService
      .userTransactionHistory(user.id, currentDate)
      .then((response) => {
        assert.isAbove(response.length, 0);
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
        assert.equal(response.body.success, true);
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
        assert.equal(response.body.success, false);
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
        assert.equal(response.body.success, false);
        return done();
      });
  });
});
