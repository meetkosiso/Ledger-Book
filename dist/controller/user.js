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
exports.authentication = exports.createUser = void 0;
const user_1 = __importDefault(require("../services/user"));
const response_1 = require("../utils/response");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userService = new user_1.default();
            const userCreated = yield userService.saveUser(req.body);
            response_1.success(res, 200, userCreated, "User was created successfully");
        }
        catch (exception) {
            response_1.fail(res, 422, `User creation failed: ${exception}`);
        }
    });
}
exports.createUser = createUser;
function authentication(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userService = new user_1.default();
            const authenticated = yield userService.authentication(req.body, process.env.SECRET || "secrets");
            response_1.success(res, 200, authenticated, "User was authenticated successfully");
        }
        catch (exception) {
            response_1.fail(res, 422, `Authentication failed: ${exception}`);
        }
    });
}
exports.authentication = authentication;
