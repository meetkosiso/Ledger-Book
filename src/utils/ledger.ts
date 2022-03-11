import { ILedger } from "../interface/ledger";

class Ledger {
  currencyConversion(token: number, multiplier: number) {
    return token * multiplier;
  }

  getStatistics(ledgers: ILedger[]) {
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

  responseWithAllowedFields(ledgers: ILedger[], fields: string[]) {
    const response = [];

    for (let i = 0; i < ledgers.length; i += 1) {
      const ledgerObject: Record<string, unknown> = {};

      for (let j = 0; j < fields.length; j += 1) {
        ledgerObject[fields[j]] = ledgers[i][fields[j] as keyof ILedger];
      }
      response.push(ledgerObject);
    }
    return response;
  }
}

export default Ledger;
