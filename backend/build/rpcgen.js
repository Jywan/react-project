"use strict";
/*
    RPC 정의 + 테스트
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2Provider = exports.RpcError = void 0;
var RpcError;
(function (RpcError) {
    RpcError[RpcError["Other"] = 0] = "Other";
    RpcError[RpcError["WrongRequest"] = 1] = "WrongRequest";
    RpcError[RpcError["NoUser"] = 2] = "NoUser";
    RpcError[RpcError["NoPost"] = 3] = "NoPost";
    RpcError[RpcError["Short"] = 4] = "Short";
})(RpcError || (exports.RpcError = RpcError = {}));
var OAuth2Provider;
(function (OAuth2Provider) {
    OAuth2Provider[OAuth2Provider["Kakao"] = 0] = "Kakao";
})(OAuth2Provider || (exports.OAuth2Provider = OAuth2Provider = {}));
