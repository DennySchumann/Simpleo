import {Schema, model, HookNextFunction, Document} from 'mongoose';

/**
 * contains the schema for the user
 */
let user_Schema: Schema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    country: {
        type: String
    },
    title: {
        type: String,
        trim: true
    },
    family_name: {
        type: String,
        trim: true,
        required: true
    },
    given_name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    }
});

export default model('user', user_Schema);