import {Schema, model} from 'mongoose';

/**
 * contains the schema for the geofences
 */
let geofences_Schema: Schema = new Schema({
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
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: 'Event',
        default: []
    }],
    old_id: Number
});

export default model('geofences', geofences_Schema);