"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rpcgen_1 = require("../rpcgen");
const rpcImpl_1 = __importDefault(require("../rpcImpl"));
const rpc = (req, res, next) => {
    const name = req.body.name;
    const f = rpcImpl_1.default[name];
    if (!f) {
        console.error(`no function for name: ${name}`);
        next(rpcgen_1.RpcError.WrongRequest);
        return;
    }
    const { request } = req.body;
    if (typeof request !== "object") {
        console.error(`request: ${request}`);
        next(rpcgen_1.RpcError.WrongRequest);
        return;
    }
    f(req.body.request)
        .then((response) => {
        res.json({ response });
    })
        .catch(next);
};
exports.default = rpc;
