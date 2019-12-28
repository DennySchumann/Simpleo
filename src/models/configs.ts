import {Schema, model} from 'mongoose';

/**
 * contains the schema for the configs
 */
let configs_Schema: Schema = new Schema({
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

export default model('configs', configs_Schema);