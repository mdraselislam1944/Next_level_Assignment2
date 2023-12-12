"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/modules/Users/user.route");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
//user application
app.use("/api", user_route_1.UserRoutes);
const getAController = (req, res) => {
    res.status(200).json({ message: "server home page" });
};
app.get('/', getAController);
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});
exports.default = app;
