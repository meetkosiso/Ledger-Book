"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
function UserEntity(user) {
    const { name, userName, password } = user;
    if (!name) {
        return Object.assign(Object.assign({ isError: true }, user), { error: "Name field is missing" });
    }
    if (!userName) {
        return Object.assign(Object.assign({ isError: true }, user), { error: "UserName field is missing" });
    }
    if (!password) {
        return Object.assign(Object.assign({ isError: true }, user), { error: "Password field is missing" });
    }
    return Object.assign({ isError: false }, user);
}
exports.UserEntity = UserEntity;
