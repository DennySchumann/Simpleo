import {Schema, model} from 'mongoose';

/**
 * contains the schema for the cronschedules
 */
let cronschedules_Schema: Schema = new Schema({
    type: String,
    dateCreated: Date,
    status: {
        type: Number,
        default: 0
    },
    error: {
        type: String,
        default: ""
    },
    attempt: {
        type: Number,
        default: 0
    },
    CreateThumbnailAll: {
        media: {
            type: Schema.Types.ObjectId,
            ref: "Media"
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event"
        },
        fileType: String
    }
});

export default model('cronschedules', cronschedules_Schema);