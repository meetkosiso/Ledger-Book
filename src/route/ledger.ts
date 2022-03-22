import express from "express";
import * as ledgerController from "../controller/ledger";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.post("/ledger/create", authenticate(), ledgerController.createLedger);
router.get(
  "/ledger/token/history/:id",
  authenticate(),
  ledgerController.currentUserTokenHistory
);
router.get(
  "/ledger/usd/history/:id",
  authenticate(),
  ledgerController.currentUserUSDHistory
);

router.get(
  "/ledger/user/stats/:id",
  authenticate(),
  ledgerController.currentUserStatistics
);

router.get(
  "/ledger/history",
  authenticate(),
  ledgerController.userTransactionHistory
);

export default router;
