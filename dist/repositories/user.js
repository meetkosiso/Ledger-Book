"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../providers/database"));
const user_1 = __importDefault(require("../models/user"));
class UserRepository {
    constructor() {
        this.dbProvider = database_1.default.getDatabaseProvider(user_1.default);
    }
    saveUser(user) {
        return this.dbProvider.add(user);
    }
    findUser(userName) {
        return this.dbProvider.find({ userName });
    }
}
exports.default = UserRepository;
