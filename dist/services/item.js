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
exports.updateItem = exports.removeItem = exports.getAvailableItemList = exports.updateItemAndInventory = exports.directInventoryUpdate = exports.updateInventory = exports.getAvailableItemQty = exports.getItemById = exports.getItem = exports.getAllItems = exports.addInventory = exports.addItem = void 0;
const database_1 = require("../database");
//add single item
function addItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        const [rows] = yield connection.query("INSERT INTO Items(name,quantity, price,createdDate, createdBy, isActive) VALUES (?,?,?,?,?,?)", [item.name, item.quantity, item.price, new Date(), item.createdBy, true]);
        connection.end();
        return rows;
    });
}
exports.addItem = addItem;
//add in inventory
function addInventory(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        const [rows] = yield connection.query("INSERT INTO Inventory(itemId, available_quantity,createdDate, updatedDate) VALUES (?,?,?,?)", [item.insertItemId, item.quantity, new Date(), new Date()]);
        connection.end();
        return rows;
    });
}
exports.addInventory = addInventory;
//get all items
function getAllItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        const [rows] = yield connection.query("SELECT it.id AS itemId, it.name AS itemName,it.quantity as itemQuantity, it.price AS itemPrice, inv.available_quantity AS available_quantity FROM Items AS it LEFT JOIN Inventory AS inv ON it.id = inv.itemId WHERE it.isActive = 1");
        connection.end();
        return rows;
    });
}
exports.getAllItems = getAllItems;
//get single item details by name
function getItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        const [rows] = yield connection.query("SELECT * FROM Items WHERE name = ? AND isActive = 1", [item.name]);
        connection.end();
        return rows;
    });
}
exports.getItem = getItem;
//get single item by id
function getItemById(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        const [rows] = yield connection.query("SELECT * FROM Items WHERE id = ? AND isActive = 1", [item.itemId]);
        connection.end();
        return rows;
    });
}
exports.getItemById = getItemById;
//Get Available Item qty by Id
function getAvailableItemQty(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        try {
            const [rows] = yield connection.query("SELECT available_quantity FROM Inventory WHERE itemId = ? FOR UPDATE", [item.itemId]);
            if (rows.length === 0) {
                return undefined;
            }
            return rows[0];
        }
        catch (error) {
            throw error;
        }
        finally {
            connection.end();
        }
    });
}
exports.getAvailableItemQty = getAvailableItemQty;
//Update Inventory
function updateInventory(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        const [rows] = yield connection.query("UPDATE Inventory SET available_quantity = available_quantity - ? WHERE itemId = ?", [item.quantity, item.itemId]);
        connection.end();
        return rows;
    });
}
exports.updateInventory = updateInventory;
//direct admin Inventory update
function directInventoryUpdate(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        const [rows] = yield connection.query("UPDATE Inventory SET available_quantity = ? WHERE itemId = ?", [item.quantity, item.itemId]);
        connection.end();
        return rows;
    });
}
exports.directInventoryUpdate = directInventoryUpdate;
//update item qty and updateInventory
function updateItemAndInventory(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        const [rows] = yield connection.query("UPDATE Inventory SET available_quantity = available_quantity + ? WHERE itemId = ?", [item.quantity, item.itemId]);
        connection.end();
        return rows;
    });
}
exports.updateItemAndInventory = updateItemAndInventory;
//Get all available Items
function getAvailableItemList() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        try {
            const [rows] = yield connection.query("SELECT it.id AS itemId, it.name AS itemName, it.price AS itemPrice, inv.available_quantity AS available_quantity FROM Items AS it LEFT JOIN Inventory AS inv ON it.id = inv.itemId WHERE inv.available_quantity > 0 AND it.isActive = 1;");
            return rows;
        }
        catch (error) {
            throw error;
        }
        finally {
            connection.end();
        }
    });
}
exports.getAvailableItemList = getAvailableItemList;
//remove single item (deactive item)
function removeItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        try {
            const [rows] = yield connection.query("UPDATE Items SET isActive = 0 WHERE id = ?", [item.itemId]);
            return rows;
        }
        catch (error) {
            throw error;
        }
        finally {
            connection.end();
        }
    });
}
exports.removeItem = removeItem;
//Update Item
function updateItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_1.connect)();
        let query = "UPDATE Items SET";
        // Array to store parameter values for the query
        const values = [];
        // Handle name update
        if (item.name) {
            query += " name = ?,";
            values.push(item.name);
        }
        // Handle quantity update
        if (item.quantity !== undefined) {
            query += " quantity = ?,";
            values.push(item.quantity);
        }
        // Handle price update
        if (item.price !== undefined) {
            query += " price = ?,";
            values.push(item.price);
        }
        // Remove the trailing comma from the query string
        query = query.slice(0, -1);
        // Add the WHERE clause to specify the item to update
        query += " WHERE id = ?";
        values.push(item.itemId);
        const [rows] = yield connection.query(query, values);
        connection.end();
        return rows;
    });
}
exports.updateItem = updateItem;
