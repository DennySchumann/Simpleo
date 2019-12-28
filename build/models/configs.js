"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the configs
 */
let configs_Schema = new mongoose_1.Schema({
    last_invoice: {
        type: Number,
        default: 999
    },
    db_shorthand: String,
    last_customer: {
        type: Number,
        default: 9999
    },
    tos: [{
            version: Date,
            text: String
        }],
    privacy_policy: {
        text: String
    }
});
exports.default = mongoose_1.model('configs', configs_Schema);
