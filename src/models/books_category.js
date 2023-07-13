import { Schema, model } from "mongoose";


const Books_category = new Schema({
    category: {
        type: String, 
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Books_category', Books_category);