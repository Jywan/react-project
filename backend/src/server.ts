import express from "express"
import rpc from "./middlewares/rpc"
import error from "./middlewares/error"
import oauth2 from "./middlewares/oauth2"

const app = express()

app.use(express.json())
app.post("/rpc", rpc)
app.get("/oauth", oauth2)
app.use(error)

export async function listen(hostname: string, port: number): Promise<void> {
    return new Promise((resolve) => {
        app.listen(port, hostname, () => {
            console.log("listen: ", hostname, port)
            resolve()
        })
    })

}