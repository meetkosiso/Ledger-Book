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
const moment_1 = __importDefault(require("moment"));
const ledger_1 = __importDefault(require("../repositories/ledger"));
const user_1 = __importDefault(require("../repositories/user"));
const ledger_2 = __importDefault(require("../utils/ledger"));
const ledger_3 = require("../entity/ledger");
class LedgerService {
    constructor() {
        this.repository = new ledger_1.default();
        this.userRepository = new user_1.default();
        this.ledger = new ledger_2.default();
    }
    saveLedger(ledgerRequest, conversionRate, dailyMaximumAllowedToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const ledgerEntity = ledger_3.LedgerEntity(ledgerRequest);
            if (ledgerEntity.isError === true) {
                throw ledgerEntity.error;
            }
            const currentDay = moment_1.default().toISOString();
            const { token, user } = ledgerEntity;
            const userFound = yield this.userRepository.findUser(user);
            if (!userFound) {
                throw "User not found";
            }
            const currentUserLedger = yield this.repository.findUserLedger(userFound.id, currentDay, currentDay);
            const currentUserTokens = this.ledger.getStatistics(currentUserLedger);
            if (parseFloat(currentUserTokens.totalToken) + token >=
                dailyMaximumAllowedToken) {
                throw "This will exceeed the daily maximum number of tokens that are allowed to be won";
            }
            const usdEquivalent = this.ledger.currencyConversion(token, conversionRate);
            const response = yield this.repository.saveLedger(Object.assign(Object.assign({}, ledgerEntity), { user: userFound.id, usd: usdEquivalent }));
            return response;
        });
    }
    currentUserTokenHistory(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDay = moment_1.default().toISOString();
            const historyFound = yield this.repository.findUserLedger(user, currentDay, currentDay);
            const history = this.ledger.responseWithAllowedFields(historyFound, [
                "token",
                "createdAt",
            ]);
            return history;
        });
    }
    currentUserUSDHistory(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDay = moment_1.default().toISOString();
            const previousDay = moment_1.default().subtract(1, "days").toISOString();
            const historyFound = yield this.repository.findUserLedger(user, previousDay, currentDay);
            const history = this.ledger.responseWithAllowedFields(historyFound, [
                "usd",
                "createdAt",
            ]);
            return history;
        });
    }
    currentUserStatistics(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDay = moment_1.default().toISOString();
            const historyFound = yield this.repository.findUserLedger(user, currentDay, currentDay);
            const userStatistics = this.ledger.getStatistics(historyFound);
            return Object.assign(Object.assign({}, userStatistics), { currentDay });
        });
    }
    userTransactionHistory(user, requestedDate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user) {
                throw "User name was not provided";
            }
            if (!requestedDate) {
                throw "Requested date was not provided";
            }
            const historyFound = yield this.repository.findUserLedger(user, requestedDate, requestedDate);
            const history = this.ledger.responseWithAllowedFields(historyFound, [
                "token",
                "usd",
                "createdAt",
            ]);
            return history;
        });
    }
}
exports.default = LedgerService;
