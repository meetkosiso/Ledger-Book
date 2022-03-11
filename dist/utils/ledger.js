"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ledger {
    currencyConversion(token, multiplier) {
        return token * multiplier;
    }
    getStatistics(ledgers) {
        let totalToken = 0;
        let totalUSD = 0;
        for (let i = 0; i < ledgers.length; i += 1) {
            totalToken += ledgers[i].token;
            totalUSD += ledgers[i].usd;
        }
        return {
            totalToken: totalToken.toFixed(2),
            totalUSD: totalUSD.toFixed(2),
        };
    }
    responseWithAllowedFields(ledgers, fields) {
        const response = [];
        for (let i = 0; i < ledgers.length; i += 1) {
            const ledgerObject = {};
            for (let j = 0; j < fields.length; j += 1) {
                ledgerObject[fields[j]] = ledgers[i][fields[j]];
            }
            response.push(ledgerObject);
        }
        return response;
    }
}
exports.default = Ledger;
