"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the eventroles
 */
let eventroles_Schema = new mongoose_1.Schema({
    title: {
        type: String,
        default: "new Event Role",
        index: {
            unique: true
        }
    },
    stream_anytime: {
        type: Boolean,
        default: false
    },
    stream_active: {
        type: Boolean,
        default: false
    },
    edit_event: {
        type: Boolean,
        default: false
    },
    view_hidden_streams: {
        type: Boolean,
        default: false
    },
    view_hidden_event: {
        type: Boolean,
        default: false
    },
    edit_content: {
        type: Boolean,
        default: false
    },
    edit_broadcaster: {
        type: Boolean,
        default: false
    },
    edit_trusted_broadcaster: {
        type: Boolean,
        default: false
    },
    delete_event: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Boolean,
        default: false
    },
    setRole: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'EventRole',
            default: []
        }],
    view_analytics: {
        type: Boolean,
        default: false
    },
    edit_networks: {
        type: Boolean,
        default: false
    },
    view_networks: {
        type: Boolean,
        default: false
    },
    board_settings: {
        type: Boolean,
        default: false
    },
    edit_contentfeed: {
        type: Boolean,
        default: false
    },
    view_playlists: {
        type: Boolean,
        default: false
    },
    edit_playlists: {
        type: Boolean,
        default: false
    },
    isTrustedBroadcaster: {
        type: Boolean,
        default: false
    },
    strength: {
        type: Number,
        default: 0
    }
});
exports.default = mongoose_1.model('eventroles', eventroles_Schema);
