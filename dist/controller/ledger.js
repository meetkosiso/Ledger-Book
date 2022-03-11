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
exports.userTransactionHistory = exports.currentUserStatistics = exports.currentUserUSDHistory = exports.currentUserTokenHistory = exports.createLedger = void 0;
const ledger_1 = __importDefault(require("../services/ledger"));
const response_1 = require("../utils/response");
const static_1 = require("../utils/static");
function createLedger(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ledgerService = new ledger_1.default();
            const ledgerCreated = yield ledgerService.saveLedger(Object.assign(Object.assign({}, req.body), { usd: 0 }), static_1.conversionRate, static_1.dailyMaximumAllowedToken);
            response_1.success(res, 200, ledgerCreated, "User was created successfully");
        }
        catch (exception) {
            response_1.fail(res, 422, `Ledger creation failed: ${exception}`);
        }
    });
}
exports.createLedger = createLedger;
function currentUserTokenHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ledgerService = new ledger_1.default();
            const currentUserToken = yield ledgerService.currentUserTokenHistory(req.params.id);
            response_1.success(res, 200, currentUserToken, "Current user token history was fetched successfully");
        }
        catch (exception) {
            response_1.fail(res, 422, `Data fetch failed: ${exception}`);
        }
    });
}
exports.currentUserTokenHistory = currentUserTokenHistory;
function currentUserUSDHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ledgerService = new ledger_1.default();
            const currentUserUSD = yield ledgerService.currentUserUSDHistory(req.params.id);
            response_1.success(res, 200, currentUserUSD, "Current user usd history was fetched successfully");
        }
        catch (exception) {
            response_1.fail(res, 422, `Data fetch failed: ${exception}`);
        }
    });
}
exports.currentUserUSDHistory = currentUserUSDHistory;
function currentUserStatistics(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ledgerService = new ledger_1.default();
            const currentUserStats = yield ledgerService.currentUserStatistics(req.params.id);
            response_1.success(res, 200, currentUserStats, "Current user stats was fetched successfully");
        }
        catch (exception) {
            response_1.fail(res, 422, `Data fetch failed: ${exception}`);
        }
    });
}
exports.currentUserStatistics = currentUserStatistics;
function userTransactionHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ledgerService = new ledger_1.default();
            const { user, date } = req.query;
            const transactionHistory = yield ledgerService.userTransactionHistory(user, date);
            response_1.success(res, 200, transactionHistory, "User transaction history was fetched successfully");
        }
        catch (exception) {
            response_1.fail(res, 422, `Data fetch failed: ${exception}`);
        }
    });
}
exports.userTransactionHistory = userTransactionHistory;
