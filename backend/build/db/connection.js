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
exports.initDB = initDB;
exports.conn = conn;
const promise_1 = __importDefault(require("mysql2/promise"));
const initQueries_1 = __importDefault(require("../db/initQueries"));
let pool;
function initDB(host, database, user, password) {
    return __awaiter(this, void 0, void 0, function* () {
        pool = promise_1.default.createPool({ host, database, user, password });
        yield Promise.all(initQueries_1.default.split(";").map((q) => pool.query(q)));
    });
}
function conn() {
    if (!pool) {
        throw Error("no db connection");
    }
    return pool;
}
