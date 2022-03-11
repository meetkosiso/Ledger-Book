import { ILedger, IValidation } from "../interface/ledger";

export function LedgerEntity(ledger: ILedger): IValidation {
  const { user, token, usd } = ledger;

  if (!user) {
    return { isError: true, ...ledger, error: "User field is missing" };
  }

  if (!token) {
    return { isError: true, ...ledger, error: "Token field is missing" };
  }

  if (!isFinite(token)) {
    return { isError: true, ...ledger, error: "Token should be in number" };
  }

  return { isError: false, ...ledger, createdAt: new Date().toISOString() };
}
