"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the hashtags
 */
let hashtags_Schema = new mongoose_1.Schema({
    hashtag: {
        type: String,
        default: ""
    },
    weight: {
        type: Number,
        default: 0
    },
    banned: {
        type: Boolean,
        default: false
    },
    old_id: {
        type: Number,
        default: 0
    }
});
exports.default = mongoose_1.model('hashtags', hashtags_Schema);
