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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderHistory = exports.addOrderItems = exports.addOrder = void 0;
const database_1 = require("../database");
//add order
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        const [rows] = yield connection.query("INSERT INTO Orders (userId, orderDate, amount) VALUES (?,?, ?)", [order.userId, new Date(), order.amount]);
        connection.end();
        return rows;
    });
}
exports.addOrder = addOrder;
//add order_item
function addOrderItems(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        const [rows] = yield connection.query("INSERT INTO Order_Items (orderId, itemId, quantity) VALUES (?, ?, ?)", [order.orderId, order.itemId, order.quantity]);
        connection.end();
        return rows;
    });
}
exports.addOrderItems = addOrderItems;
//get order history
function getOrderHistory(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        const [rows] = yield connection.query("SELECT oi.orderId, o.amount,oi.itemId, oi.quantity, i.name AS itemName,o.orderDate FROM Orders AS o JOIN Order_Items AS oi ON o.id = oi.orderId JOIN Items AS i ON i.id = oi.itemId WHERE o.userId = ?;", [order.userId]);
        connection.end();
        return rows;
    });
}
exports.getOrderHistory = getOrderHistory;
