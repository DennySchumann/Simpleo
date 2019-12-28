"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let users_Schema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});
exports.default = mongoose_1.model('users', users_Schema);
