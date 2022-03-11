"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const ledger_1 = __importDefault(require("./ledger"));
const router = express_1.default.Router();
router.use(user_1.default);
router.use(ledger_1.default);
exports.default = router;
