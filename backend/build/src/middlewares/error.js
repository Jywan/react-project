"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mustOne = mustOne;
exports.mustLong = mustLong;
function mustOne(arr, e) {
    if (!arr[0]) {
        throw e;
    }
    return arr[0];
}
function mustLong(v, e, min = 2) {
    v = v.trim();
    if (v.length < min) {
        throw e;
    }
    return v;
}
