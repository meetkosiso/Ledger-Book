"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerEntity = void 0;
function LedgerEntity(ledger) {
    const { user, token, usd } = ledger;
    if (!user) {
        return Object.assign(Object.assign({ isError: true }, ledger), { error: "User field is missing" });
    }
    if (!token) {
        return Object.assign(Object.assign({ isError: true }, ledger), { error: "Token field is missing" });
    }
    if (!isFinite(token)) {
        return Object.assign(Object.assign({ isError: true }, ledger), { error: "Token should be in number" });
    }
    return Object.assign(Object.assign({ isError: false }, ledger), { createdAt: new Date().toISOString() });
}
exports.LedgerEntity = LedgerEntity;
