import express from "express"

const app = express()

app.use(express.json())

export async function listen(hostname: string, port: number): Promise<void> {
    return new Promise((resolve) => {
        app.listen(port, hostname, resolve)
    })

}