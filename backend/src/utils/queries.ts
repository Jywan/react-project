import { RowDataPacket } from "mysql2"
import { conn } from "../db/connection"
import { mustOne } from "./error"

export async function select<T>(sql: string, value: any): Promise<T[]> {
    const [rows] = await conn().query<RowDataPacket[]>(sql, value)
    return rows as T[]
}

export async function selectOne<T>(
    sql: string,
    value: any,
    e: unknown,
): Promise<T> {
    const rows = await select(sql, value)
    return mustOne(rows, e)
}