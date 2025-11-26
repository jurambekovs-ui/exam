import { Schema, model } from "mongoose";

const movie= new Schema ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    language: {type: String, required: true},
    genre: {type: String, required: true},
    releaseDate: {type: Date, required: true},
},{
    version: false,
    timestamps: true
});

export default model('Movie', movie);

