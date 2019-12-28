"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the bokkings
 */
let bookings_Schema = new mongoose_1.Schema({
    packages: [{
            package: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Package'
            },
            amount: Number
        }],
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    events: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Event',
            default: null
        }],
    start: {
        type: Date,
        default: null
    },
    end: {
        type: Date,
        default: null
    },
    payment: [{
            informations: Object,
            method: String,
            voucher: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Voucher'
            },
            discount: Number,
            creator: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User'
            }
        }],
    invoice: String
});
exports.default = mongoose_1.model('bookings', bookings_Schema);
