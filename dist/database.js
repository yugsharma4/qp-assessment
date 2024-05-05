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
exports.connect = void 0;
const promise_1 = require("mysql2/promise");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Connection===");
        console.log(process.env.MYSQL_HOST);
        console.log(process.env.MYSQL_USER);
        console.log(process.env.MYSQL_DATABASE);
        console.log(process.env.MYSQL_PASSWORD);
        const connection = yield (0, promise_1.createConnection)({
            host: process.env.MYSQL_HOST || "localhost",
            port: 3306,
            user: process.env.MYSQL_USER || "root",
            password: process.env.MYSQL_PASSWORD || "password",
            database: process.env.MYSQL_DATABASE || "grocery_booking",
        });
        return connection;
    });
}
exports.connect = connect;
