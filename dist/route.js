"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_1 = __importDefault(require("./routes/item"));
const auth_1 = __importDefault(require("./routes/auth"));
const order_1 = __importDefault(require("./routes/order"));
const app = (0, express_1.default)();
app.use("/item", item_1.default);
app.use("/auth", auth_1.default);
app.use("/order", order_1.default);
exports.default = app;
