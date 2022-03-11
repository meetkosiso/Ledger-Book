"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ledgerController = __importStar(require("../controller/ledger"));
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.post("/ledger/create", authenticate_1.authenticate(), ledgerController.createLedger);
router.get("/ledger/current/token/history/:id", authenticate_1.authenticate(), ledgerController.currentUserTokenHistory);
router.get("/ledger/current/usd/history/:id", authenticate_1.authenticate(), ledgerController.currentUserUSDHistory);
router.get("/ledger/current/user/stats/:id", authenticate_1.authenticate(), ledgerController.currentUserStatistics);
router.get("/ledger/user/history", authenticate_1.authenticate(), ledgerController.userTransactionHistory);
exports.default = router;
