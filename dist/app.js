"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./connection/database");
const route_1 = __importDefault(require("./route"));
const app = express_1.default();
dotenv_1.default.config();
if (process.env.NODE_ENV === "dev") {
    database_1.databaseConnection(process.env.MONGODB_URL || "mongodb://localhost/arda");
}
app.use(morgan_1.default("dev"));
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "Welcome to LIVE API." });
});
app.use("/api", route_1.default);
app.use((req, res, next) => {
    const error = new Error("Not found!");
    next(error);
});
app.use((error, req, res, next) => {
    res.json({
        error: {
            message: `API says ${error.message}`,
        },
    });
    next();
});
app.listen(3000, () => console.log("listening at port 3000"));
exports.default = app;
