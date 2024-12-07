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
const queries_1 = require("../db/queries");
const convert_1 = require("../db/convert");
const userId = 1;
const rpcImpl = {
    createPost: (req) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, queries_1.insertPost)(req.body, userId);
        return {};
    }),
    createComment: (req) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, queries_1.insertComment)(req.body, userId, req.postId);
        return {};
    }),
    readPost: (req) => __awaiter(void 0, void 0, void 0, function* () {
        return { post: yield (0, convert_1.toPost)(yield (0, queries_1.selectPost)(req.postId)) };
    }),
    readRandomPost: (req) => __awaiter(void 0, void 0, void 0, function* () {
        return { post: yield (0, convert_1.toPost)(yield (0, queries_1.selectRandomPost)()) };
    }),
    readProfile: (req) => __awaiter(void 0, void 0, void 0, function* () {
        return { user: yield (0, convert_1.toUser)(yield (0, queries_1.selectUser)(userId)) };
    }),
    readPreview: (req) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            comments: yield (0, convert_1.toComments)(yield (0, queries_1.selectCommentsByAuthor)(userId)),
            posts: yield (0, convert_1.toPosts)(yield (0, queries_1.selectPostsByAuthor)(userId)),
        };
    }),
    updateProfile: (req) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, queries_1.updateUser)(userId, req.name);
        return {};
    }),
};
exports.default = rpcImpl;
