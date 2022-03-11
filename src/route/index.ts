import express from "express";

import userRoute from "./user";
import ledgerRoute from "./ledger";
const router = express.Router();

router.use(userRoute);
router.use(ledgerRoute);

export default router;
