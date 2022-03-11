"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class Password {
    hash(password) {
        return bcrypt_1.hashSync(password, bcrypt_1.genSaltSync(8));
    }
    compare(savedPassword, password) {
        return bcrypt_1.compareSync(savedPassword, password);
    }
    getToken(payload, secrets) {
        return jsonwebtoken_1.sign(payload, secrets);
    }
}
exports.default = Password;
