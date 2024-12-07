import { RequestHandler, response } from "express"
import { IRpc, RpcError, RpcFunctionResponse } from "../rpcgen"
import rpcImpl from "../rpcImpl"

const rpc: RequestHandler = (req, res, next) => {
    const name = req.body.name as keyof IRpc
    const f = rpcImpl[name]
    if (!f) {
        console.error(`no function for name: ${name}`)
        next(RpcError.WrongRequest)
        return
    }

    const { request } = req.body
    if (typeof request !== "object") {
        console.error(`request: ${request}`)
        next(RpcError.WrongRequest)
        return
    }

    f(req.body.request)
        .then((response) => {
            res.json({ response })
        })
        .catch(next)
}


export default rpc