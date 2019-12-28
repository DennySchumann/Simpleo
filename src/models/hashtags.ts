import {Schema, model} from 'mongoose';

/**
 * contains the schema for the hashtags
 */
let hashtags_Schema: Schema = new Schema({
    hashtag: {
        type: String,
        default: ""
    },
    weight: {
        type: Number,
        default: 0
    },
    banned: {
        type: Boolean,
        default: false
    },
    old_id: {
        type: Number,
        default: 0
    }
});

export default model('hashtags', hashtags_Schema);