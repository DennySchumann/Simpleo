"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const emailType = require("mongoose-type-email");
let user_Schema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    email: { type: emailType, max: 20 },
    password: String
});
exports.default = mongoose_1.model('events', user_Schema);
