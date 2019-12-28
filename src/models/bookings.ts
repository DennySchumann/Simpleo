import {Schema, model} from 'mongoose';

/**
 * contains the schema for the bokkings
 */
let bookings_Schema: Schema = new Schema({
    packages: [{
        package: {
            type: Schema.Types.ObjectId,
            ref: 'Package'
        },
        amount: Number
    }],
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    events: [{
        type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
            ref: 'Voucher'
        },
        discount: Number,
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    invoice: String
});

export default model('bookings', bookings_Schema);