import {Schema, model} from 'mongoose';

/**
 * contains the schema for the eventsconnectors
 */
let eventsconnectors_Schema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    events: [{
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        },
        role: {
            type: Schema.Types.ObjectId,
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

export default model('eventsconnectors', eventsconnectors_Schema);