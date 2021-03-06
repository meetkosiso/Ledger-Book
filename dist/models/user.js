"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
});
exports.default = mongoose_1.model("User", schema);
