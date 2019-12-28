"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the cronschedules
 */
let cronschedules_Schema = new mongoose_1.Schema({
    type: String,
    dateCreated: Date,
    status: {
        type: Number,
        default: 0
    },
    error: {
        type: String,
        default: ""
    },
    attempt: {
        type: Number,
        default: 0
    },
    CreateThumbnailAll: {
        media: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Media"
        },
        event: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Event"
        },
        fileType: String
    }
});
exports.default = mongoose_1.model('cronschedules', cronschedules_Schema);
