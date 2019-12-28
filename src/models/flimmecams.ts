import {Schema, model} from 'mongoose';

/**
 * contains the schema for the flimmecams
 */
let flimmecams_Schema: Schema = new Schema({
    title: String,
    camId: String
});

export default model('flimmecams', flimmecams_Schema);