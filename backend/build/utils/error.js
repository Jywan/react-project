"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mustOne = mustOne;
exports.mustLong = mustLong;
exports.mustString = mustString;
exports.mustInt = mustInt;
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
function mustString(v, e) {
    if (typeof v !== "string") {
        throw e;
    }
    return v;
}
function mustInt(v, e) {
    const n = parseInt(v, 10);
    if (Number.isNaN(n)) {
        throw e;
    }
    return n;
}
