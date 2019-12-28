"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the geofences
 */
let geofences_Schema = new mongoose_1.Schema({
    name: {
        type: String,
        default: ""
    },
    validity_begin: Date,
    validity_end: {
        type: Date,
        default: null
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    approx_position: {
        latitude: {
            type: Number,
            default: 0
        },
        longitude: {
            type: Number,
            default: 0
        }
    },
    polygon: {
        type: {
            type: String
        },
        coordinates: []
    },
    active: {
        type: Boolean,
        default: false
    },
    events: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Event',
            default: []
        }],
    old_id: Number
});
exports.default = mongoose_1.model('geofences', geofences_Schema);
