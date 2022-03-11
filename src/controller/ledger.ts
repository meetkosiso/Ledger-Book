import { Request, Response } from "express";

import LedgerService from "../services/ledger";
import { success, fail } from "../utils/response";
import { conversionRate, dailyMaximumAllowedToken } from "../utils/static";

export async function createLedger(req: Request, res: Response) {
  try {
    const ledgerService = new LedgerService();
    const ledgerCreated = await ledgerService.saveLedger(
      {
        ...req.body,
        usd: 0,
      },
      conversionRate,
      dailyMaximumAllowedToken
    );
    success(res, 200, ledgerCreated, "User was created successfully");
  } catch (exception) {
    fail(res, 422, `Ledger creation failed: ${exception}`);
  }
}

export async function currentUserTokenHistory(req: Request, res: Response) {
  try {
    const ledgerService = new LedgerService();
    const currentUserToken = await ledgerService.currentUserTokenHistory(
      req.params.id
    );
    success(
      res,
      200,
      currentUserToken,
      "Current user token history was fetched successfully"
    );
  } catch (exception) {
    fail(res, 422, `Data fetch failed: ${exception}`);
  }
}

export async function currentUserUSDHistory(req: Request, res: Response) {
  try {
    const ledgerService = new LedgerService();
    const currentUserUSD = await ledgerService.currentUserUSDHistory(
      req.params.id
    );
    success(
      res,
      200,
      currentUserUSD,
      "Current user usd history was fetched successfully"
    );
  } catch (exception) {
    fail(res, 422, `Data fetch failed: ${exception}`);
  }
}

export async function currentUserStatistics(req: Request, res: Response) {
  try {
    const ledgerService = new LedgerService();
    const currentUserStats = await ledgerService.currentUserStatistics(
      req.params.id
    );
    success(
      res,
      200,
      currentUserStats,
      "Current user stats was fetched successfully"
    );
  } catch (exception) {
    fail(res, 422, `Data fetch failed: ${exception}`);
  }
}

export async function userTransactionHistory(req: Request, res: Response) {
  try {
    const ledgerService = new LedgerService();
    const { user, date } = req.query;
    const transactionHistory = await ledgerService.userTransactionHistory(
      user as string,
      date as string
    );
    success(
      res,
      200,
      transactionHistory,
      "User transaction history was fetched successfully"
    );
  } catch (exception) {
    fail(res, 422, `Data fetch failed: ${exception}`);
  }
}
