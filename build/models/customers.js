"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * contains the schema for the customers
 */
let customers_Schema = new mongoose_1.Schema({
    name: {
        type: String,
        default: ""
    },
    name_sort: {
        type: String,
        default: ""
    },
    date_entered: Date,
    created_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    deleted: {
        type: Date,
        default: null
    },
    account_type: {
        type: String,
        default: ""
    },
    company: {
        type: Boolean,
        default: true
    },
    phone_fax: {
        type: String,
        default: ""
    },
    billing_firstname: {
        type: String,
        default: ""
    },
    billing_lastname: {
        type: String,
        default: ""
    },
    billing_address_street: {
        type: String,
        default: ""
    },
    billing_address_city: {
        type: String,
        default: ""
    },
    billing_address_state: {
        type: String,
        default: ""
    },
    billing_address_postalcode: {
        type: String,
        default: ""
    },
    billing_address_country: {
        type: String,
        default: ""
    },
    billing_email: {
        type: String,
        default: ""
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    phone_office: {
        type: String,
        default: ""
    },
    phone_alternate: {
        type: String,
        default: ""
    },
    website: {
        type: String,
        default: ""
    },
    vat: {
        type: String,
        default: ""
    },
    accounts: [{
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User'
            },
            role: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'CustomerRole'
            },
            _id: false,
            default: []
        }],
    packages: [{
            package: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Package'
            },
            package_count: Number,
            default: []
        }],
    customer_number: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    }
});
exports.default = mongoose_1.model('customers', customers_Schema);
