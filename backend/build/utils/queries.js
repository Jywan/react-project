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
exports.select = select;
exports.selectOne = selectOne;
const connection_1 = require("../db/connection");
const error_1 = require("./error");
function select(sql, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const [rows] = yield (0, connection_1.conn)().query(sql, value);
        return rows;
    });
}
function selectOne(sql, value, e) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield select(sql, value);
        return (0, error_1.mustOne)(rows, e);
    });
}
