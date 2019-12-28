import {Schema, model} from 'mongoose';

let users_Schema: Schema = new Schema({
    username:{
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

export default model('users', users_Schema);