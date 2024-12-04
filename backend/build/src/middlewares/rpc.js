"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rpcImpl_1 = __importDefault(require("../rpcImpl"));
const rpc = (req, res, next) => {
    const name = req.body.name;
    rpcImpl_1.default[name](req.body.request)
        .then((response) => {
        res.json({ response });
    })
        .catch(next);
};
exports.default = rpc;
