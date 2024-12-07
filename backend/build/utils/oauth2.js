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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthUrl = getAuthUrl;
exports.fetchToken = fetchToken;
exports.fetchUniqueId = fetchUniqueId;
const node_fetch_1 = __importDefault(require("node-fetch"));
const rpcgen_1 = require("../rpcgen");
const infos = {
    [rpcgen_1.OAuth2Provider.Kakao]: {
        authUrl: "https://kauth.kakao.com/oauth/authorize",
        tokenUrl: "https://kauth.kakao.com/oauth/token",
        /* 카카오 개발자 웹 앱키(REST API) */
        clientId: "6ed4b01674eac51966e8d73eee162b59",
        uniqueIdUrl: "https://kapi.kakao.com/v2/user/me",
        getUniqueId: (res) => __awaiter(void 0, void 0, void 0, function* () {
            const json = (yield res.json());
            if (typeof json.id === "number") {
                return `kakao${json.id}`;
            }
            throw json;
        }),
    },
};
const redirectUrl = "http://127.0.0.1:8080/oauth";
function getAuthUrl(provider) {
    const info = infos[provider];
    const params = new URLSearchParams();
    params.set("response_type", "code");
    params.set("redirect_uri", redirectUrl);
    params.set("client_id", info.clientId);
    params.set("state", `${provider}`);
    return `${info.authUrl}?${params.toString()}`;
}
function fetchToken(provider, code) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = infos[provider];
        const parmas = new URLSearchParams();
        parmas.set("grant_type", "authorization_code");
        parmas.set("client_id", info.clientId);
        parmas.set("redirect_uri", redirectUrl);
        parmas.set("code", code);
        const res = yield (0, node_fetch_1.default)(info.tokenUrl, { method: "POST", body: parmas });
        const json = (yield res.json());
        const accessToken = json.access_token;
        if (!accessToken) {
            throw json;
        }
        return accessToken;
    });
}
function fetchUniqueId(provider, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = infos[provider];
        const res = yield (0, node_fetch_1.default)(info.uniqueIdUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return info.getUniqueId(res);
    });
}
