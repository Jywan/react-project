"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCommentsByPost = exports.selectCommentsByAuthor = exports.selectPostsByAuthor = exports.selectRandomPost = exports.selectPost = exports.selectUser = void 0;
exports.insertUser = insertUser;
exports.insertPost = insertPost;
exports.insertComment = insertComment;
exports.updateUser = updateUser;
const connection_1 = require("./connection");
const rpcgen_1 = require("../src/rpcgen");
const error_1 = require("../src/utils/error");
const queries_1 = require("../src/utils/queries");
const ml = (v, min) => (0, error_1.mustLong)(v, rpcgen_1.RpcError.Short, min);
function insertUser(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.conn)().query("insert into `users` (`name`) values(?)", [ml(name)]);
    });
}
function insertPost(body, authorId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.conn)().query("insert into `posts` (`body`, `authorId`, timestamp) values(?, ?, ?)", [body, authorId, Date.now()]);
    });
}
function insertComment(body, authorId, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.conn)().query("insert into `comments` (`body`, `authorId`, `postId`, `timestamp`)", [body, authorId, postId, Date.now()]);
    });
}
const selectUser = (id) => (0, queries_1.selectOne)("select * from `users` where `id` = ?", [id], rpcgen_1.RpcError.NoUser);
exports.selectUser = selectUser;
const selectPost = (id) => (0, queries_1.selectOne)("select * from `posts` where `id` = ?", [id], rpcgen_1.RpcError.NoPost);
exports.selectPost = selectPost;
const selectRandomPost = () => (0, queries_1.selectOne)("select * from `posts` order by rand() limit 1", undefined, rpcgen_1.RpcError.NoPost);
exports.selectRandomPost = selectRandomPost;
const selectPostsByAuthor = (authorId) => (0, queries_1.select)("select * from `posts` where `authorId` = ?", [authorId]);
exports.selectPostsByAuthor = selectPostsByAuthor;
const selectCommentsByAuthor = (authorId) => (0, queries_1.select)("select * from `comments` where `authorId` = ?", [authorId]);
exports.selectCommentsByAuthor = selectCommentsByAuthor;
const selectCommentsByPost = (postId) => (0, queries_1.select)("select * from `comments` where `postId` = ?", [postId]);
exports.selectCommentsByPost = selectCommentsByPost;
function updateUser(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.conn)().query("update `users` set `name` = ? where `id` = ?", [ml(name), id]);
    });
}
function findyById(id, arr) {
    const r = arr.find((v) => v.id === id);
    if (!r) {
        throw Error(`no id: ${id}`);
    }
    return r;
}
