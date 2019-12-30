"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the user
 */
let user_Schema = new mongoose_1.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    country: {
        type: String
    },
    title: {
        type: String,
        trim: true
    },
    family_name: {
        type: String,
        trim: true,
        required: true
    },
    given_name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    password_hash: {
        type: String,
        required: true
    },
    client_key: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.model('user', user_Schema);
