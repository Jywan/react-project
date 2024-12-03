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
exports.insertUser = insertUser;
exports.insertPost = insertPost;
exports.insertCommnet = insertCommnet;
exports.selectUser = selectUser;
exports.selectPost = selectPost;
exports.selectRandomPost = selectRandomPost;
exports.selecPostsByAuthor = selecPostsByAuthor;
exports.selectCommentsByAuthor = selectCommentsByAuthor;
exports.selectCommentsByPost = selectCommentsByPost;
exports.updateUser = updateUser;
function insertUser(name) {
    return __awaiter(this, void 0, void 0, function* () {
        users.push({ id: users.length, name });
    });
}
function insertPost(body, authorId) {
    return __awaiter(this, void 0, void 0, function* () {
        posts.push({ id: posts.length, body, authorId, timestamp: Date.now() });
    });
}
function insertCommnet(body, authorId, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        comments.push({ id: comments.length, postId, body, authorId, timestamp: Date.now() });
    });
}
function selectUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return findyById(id, users);
    });
}
function selectPost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return findyById(id, posts);
    });
}
function selectRandomPost() {
    return __awaiter(this, void 0, void 0, function* () {
        return posts[Math.floor(Math.random() * posts.length)];
    });
}
function selecPostsByAuthor(authorId) {
    return __awaiter(this, void 0, void 0, function* () {
        return posts.filter((v) => v.authorId === authorId);
    });
}
function selectCommentsByAuthor(authorId) {
    return __awaiter(this, void 0, void 0, function* () {
        return comments.filter((v) => v.authorId === authorId);
    });
}
function selectCommentsByPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        return comments.filter((v) => v.postId === postId);
    });
}
function updateUser(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = findyById(id, users);
        user.name = name;
    });
}
function findyById(id, arr) {
    const r = arr.find((v) => v.id === id);
    if (!r) {
        throw Error(`no id: ${id}`);
    }
    return r;
}
const users = [
    { id: 0, name: "김XX" },
    { id: 1, name: "이XX" }
];
const posts = [
    { id: 0, authorId: 0, body: "첫 번째 글입니다.", timestamp: Date.now() - 1231233 },
    { id: 1, authorId: 1, body: "두 번째 글입니다.", timestamp: Date.now() - 1231233 },
    { id: 2, authorId: 1, body: "세 번째 글입니다.", timestamp: Date.now() - 1231233 },
    { id: 3, authorId: 0, body: "네 번째 글입니다.", timestamp: Date.now() - 1231233 }
];
const comments = [
    { id: 0, authorId: 0, postId: 0, body: "첫 번째 글의 첫 번째 댓글", timestamp: Date.now() + 1231233 },
    { id: 1, authorId: 1, postId: 0, body: "첫 번째 글의 두 번째 댓글", timestamp: Date.now() + 12312334 },
    { id: 2, authorId: 0, postId: 2, body: "3번글의 댓글", timestamp: Date.now() + 12312335 }
];
