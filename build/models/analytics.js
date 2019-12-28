"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the analytics
 */
let analytics_Schema = new mongoose_1.Schema({
    event: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Event'
    },
    action: String,
    context: String,
    timestamp: Date,
    user_client: String,
    media: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Media'
    }
});
exports.default = mongoose_1.model('analytics', analytics_Schema);
