"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../utils/response");
function authenticate() {
    return (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) {
            response_1.fail(res, 401, "No token found");
            return;
        }
        let token;
        token = authorization.split(" ")[1];
        if (!token) {
            response_1.fail(res, 401, "No token found");
            return;
        }
        jsonwebtoken_1.default.verify(token, process.env.SECRET || "secrets", (err, decoded) => {
            if (err) {
                response_1.fail(res, 401, "Invalid token");
            }
            else {
                next();
            }
        });
    };
}
exports.authenticate = authenticate;
