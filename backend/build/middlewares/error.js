"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rpcgen_1 = require("../rpcgen");
const error = (err, req, res, next) => {
    if (req.url !== "/rpc") {
        console.error(req.url, err);
        next(JSON.stringify(err));
        return;
    }
    if (typeof err !== "number") {
        console.error("other error: ", err);
        err = rpcgen_1.RpcError.Other;
    }
    res.json({ error: err });
};
exports.default = error;
