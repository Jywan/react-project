import { CommentModel, PostModel, UserModel } from "./models";
import { conn } from "./connection"
import { OAuth2Provider, RpcError } from "../../src/rpcgen";
import { mustLong } from "../../src/utils/error";
import { select, selectOne } from "../../src/utils/queries"


const ml = (v: string, min?: number) => mustLong(v, RpcError.Short, min)

export async function insertUser(name: string, provider: OAuth2Provider, uniqueId: string): Promise<void> {
    await conn().query("insert into `users` (`name`, `provider`, `uniqueId`) values(?, ?, ?)", [ml(name), provider, uniqueId])
}

export async function insertPost(body: string, authorId: number): Promise<void> {
    await conn().query(
        "insert into `posts` (`body`, `authorId`, timestamp) values(?, ?, ?)",
        [body, authorId, Date.now()]
    )
}

export async function insertComment(body: string, authorId: number, postId: number): Promise<void> {
    await conn().query(
        "insert into `comments` (`body`, `authorId`, `postId`, `timestamp`)",
        [body, authorId, postId, Date.now()]
    )
}

export const selectUser = (id: number): Promise<UserModel> =>
    selectOne("select * from `users` where `id` = ?", [id], RpcError.NoUser)

export const selectPost = (id: number): Promise<PostModel> =>
    selectOne("select * from `posts` where `id` = ?", [id], RpcError.NoPost)

export const selectRandomPost = (): Promise<PostModel> =>
    selectOne("select * from `posts` order by rand() limit 1", undefined, RpcError.NoPost)

export const selectPostsByAuthor = (authorId: number): Promise<PostModel[]> =>
    select("select * from `posts` where `authorId` = ?", [authorId])

export const selectCommentsByAuthor = (authorId: number): Promise<CommentModel[]> =>
    select("select * from `comments` where `authorId` = ?", [authorId])

export const selectCommentsByPost = (postId: number): Promise<CommentModel[]> =>
    select("select * from `comments` where `postId` = ?", [postId])

export async function updateUser(id: number, name: string): Promise<void> {
    await conn().query(
        "update `users` set `name` = ? where `id` = ?",
        [ml(name), id]
    )
}

export const selectUserByUniqueId = (provider: OAuth2Provider, uniqueId: string,): Promise<UserModel> =>
    selectOne("select * from `users` where `provider` = ? and `uniqueId` = ?",
        [provider, uniqueId],
        RpcError.NoUser,
    )

export async function selectOrInsertUser(name: string, provider: OAuth2Provider, uniqueId: string): Promise<UserModel> {
    try {
        return await selectUserByUniqueId(provider, uniqueId)
    } catch (e) {
        if (e === RpcError.NoUser) {
            await insertUser(name, provider, uniqueId)
            return selectUserByUniqueId(provider, uniqueId)
        }
        throw e
    }

}


function findyById<T extends { id: number }>(id: number, arr: T[]): T {
    const r = arr.find((v) => v.id === id)
    if (!r) {
        throw Error(`no id: ${id}`)
    }
    return r
}
