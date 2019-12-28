import {Schema, model} from 'mongoose';

/**
 * contains the schema for the analytics
 */
let analytics_Schema: Schema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    action: String,
    context: String,
    timestamp: Date,
    user_client: String,
    media: {
        type: Schema.Types.ObjectId,
        ref: 'Media'
    }
});

export default model('analytics', analytics_Schema);