import {Schema, model} from 'mongoose';

/**
 * contains the schema for the posts
 * TODO: complete the schema
 */
let posts_Schema: Schema = new Schema({
});

export default model('posts', posts_Schema);