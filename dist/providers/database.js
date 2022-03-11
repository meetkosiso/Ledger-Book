"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatabaseFactory {
    static getDatabaseProvider(model) {
        return new DatabaseProvider(model);
    }
}
class DatabaseProvider {
    constructor(model) {
        this.model = model;
    }
    add(entity) {
        return this.model.create(entity);
    }
    find(query) {
        return this.model.findOne(query);
    }
    findAll(query) {
        return this.model.find(query);
    }
}
exports.default = DatabaseFactory;
