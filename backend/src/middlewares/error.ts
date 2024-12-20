import { ErrorRequestHandler } from "express";
import { RpcError } from "../rpcgen";

const error: ErrorRequestHandler = (err, req, res, next) => {
    if (req.url !== "/rpc") {
        console.error(req.url, err)
        next(JSON.stringify(err))
        return
    }

    if (typeof err !== "number") {
        console.error("other error: ", err)
        err = RpcError.Other
    }
    res.json({ error: err })
}

export default error