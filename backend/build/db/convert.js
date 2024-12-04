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
exports.toUser = toUser;
exports.toComment = toComment;
exports.toComments = toComments;
exports.toPost = toPost;
exports.toPosts = toPosts;
const queries_1 = require("./queries");
function toUser(m) {
    return __awaiter(this, void 0, void 0, function* () {
        return { name: m.name, id: m.id };
    });
}
function toComment(m) {
    return __awaiter(this, void 0, void 0, function* () {
        const author = yield toUser(yield (0, queries_1.selectUser)(m.authorId));
        return { id: m.id, body: m.body, timestamp: m.timestamp, author };
    });
}
function toComments(arr) {
    return Promise.all(arr.map((v) => toComment(v)));
}
function toPost(m) {
    return __awaiter(this, void 0, void 0, function* () {
        const author = yield toUser(yield (0, queries_1.selectUser)(m.authorId));
        return {
            id: m.id,
            body: m.body,
            timestamp: m.timestamp,
            author,
            comments: yield toComments(yield (0, queries_1.selectCommentsByPost)(m.id)),
        };
    });
}
function toPosts(arr) {
    return Promise.all(arr.map((v) => toPost(v)));
}
