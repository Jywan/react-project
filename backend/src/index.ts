import { listen } from "./server"
import { initDB } from "./db/connection"

async function f() {
    await listen("127.0.0.1", 8080)
    await initDB("localhost", "dbdb", "useruser", "1234")
}
f()