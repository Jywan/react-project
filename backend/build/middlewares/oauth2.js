"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../utils/error");
const oauth2_1 = require("../utils/oauth2");
const queries_1 = require("../db/queries");
const oauth2 = (req, res, next) => {
    const code = (0, error_1.mustString)(req.query["code"], "no code");
    const state = (0, error_1.mustString)(req.query["state"], "no state");
    const provider = (0, error_1.mustInt)(state, `${state} is not a provider`);
    (0, oauth2_1.fetchToken)(provider, code)
        .then((accessToken) => {
        return (0, oauth2_1.fetchUniqueId)(provider, accessToken);
    })
        .then((uniqueId) => {
        return (0, queries_1.selectOrInsertUser)("익명", provider, uniqueId);
    })
        .then((user) => {
        res.send(JSON.stringify(user));
    })
        .catch(next);
};
exports.default = oauth2;
