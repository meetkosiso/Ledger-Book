"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fail = exports.success = void 0;
function success(res, status, entity, msg) {
    res.status(status || 200).json({
        success: true,
        data: entity,
        message: msg || "Record(s)",
    });
}
exports.success = success;
function fail(res, status, msg) {
    res.status(status || 500).json({
        success: false,
        data: [],
        message: msg || "Record(s)",
    });
}
exports.fail = fail;
