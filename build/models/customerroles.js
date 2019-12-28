"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the customerroles
 */
let customerroles_Schema = new mongoose_1.Schema({
    title: {
        type: String,
        default: "new Customer Role",
        index: {
            unique: true
        }
    },
    billing_management: {
        type: Boolean,
        default: false
    },
    edit_base_data: {
        type: Boolean,
        default: false
    },
    manage_employee: {
        type: Boolean,
        default: false
    },
    manage_all_events: {
        type: Boolean,
        default: false
    },
    manage_own_events: {
        type: Boolean,
        default: false
    },
    book_professional_streams: {
        type: Boolean,
        default: false
    },
    manage_ads: {
        type: Boolean,
        default: false
    },
    create_events: {
        type: Boolean,
        default: false
    },
    setRole: {
        type: [String],
        default: []
    },
    delete_customer: {
        type: Boolean,
        default: false
    },
    edit_networks: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Boolean,
        default: false
    }
});
exports.default = mongoose_1.model('customerroles', customerroles_Schema);
