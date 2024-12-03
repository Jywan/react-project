import {insertPost, selectPostsByAuthor, selectUser} from "../db/queries"

async function f() {
    console.log(await selectUser(1))

    console.log("before")
    console.log(await selectPostsByAuthor(1))
    await insertPost("새 글", 1)
    console.log("after")
    console.log(await selectPostsByAuthor(1))
}

f()