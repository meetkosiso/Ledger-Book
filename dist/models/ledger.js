"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    user: { type: String, required: true },
    token: { type: Number, required: true },
    usd: { type: Number, required: true },
    createdAt: { type: String, required: true },
});
exports.default = mongoose_1.model("Ledger", schema);
