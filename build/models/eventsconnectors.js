"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the eventsconnectors
 */
let eventsconnectors_Schema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    events: [{
            event: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Event'
            },
            role: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'EventRole'
            },
            tag: String,
            title: String,
            date_start: Date,
            date_end: Date,
            visibility: Boolean,
            published: Date,
            _id: false
        }]
});
exports.default = mongoose_1.model('eventsconnectors', eventsconnectors_Schema);
