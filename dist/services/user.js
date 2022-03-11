"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../repositories/user"));
const password_1 = __importDefault(require("../utils/password"));
const user_2 = require("../entity/user");
class UserService {
    constructor() {
        this.repository = new user_1.default();
        this.password = new password_1.default();
    }
    saveUser(userRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEntity = user_2.UserEntity(userRequest);
            if (userEntity.isError === true) {
                throw userEntity.error;
            }
            const { name, userName, password } = userEntity;
            const userFound = yield this.repository.findUser(userName);
            if (userFound) {
                throw "User already exist";
            }
            const hashedPassword = this.password.hash(password);
            const response = yield this.repository.saveUser(Object.assign(Object.assign({}, userEntity), { password: hashedPassword }));
            return response;
        });
    }
    authentication(loginRequest, secrets) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, password } = loginRequest;
            const userFound = yield this.repository.findUser(userName);
            if (!userFound) {
                throw "User not found";
            }
            const passwordMatched = this.password.compare(password, userFound.password);
            if (!passwordMatched) {
                throw "Incorrect password";
            }
            return this.password.getToken({}, secrets);
        });
    }
}
exports.default = UserService;
