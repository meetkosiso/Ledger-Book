"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const database_1 = __importDefault(require("../providers/database"));
const ledger_1 = __importDefault(require("../models/ledger"));
class LedgerRepository {
    constructor() {
        this.dbProvider = database_1.default.getDatabaseProvider(ledger_1.default);
    }
    saveLedger(ledger) {
        return this.dbProvider.add(ledger);
    }
    findUserLedger(user, startDate, endDate) {
        return this.dbProvider.findAll({
            createdAt: {
                $gte: moment_1.default(startDate).startOf("day").toISOString(),
                $lte: moment_1.default(endDate).endOf("day").toISOString(),
            },
            user,
        });
    }
}
exports.default = LedgerRepository;
