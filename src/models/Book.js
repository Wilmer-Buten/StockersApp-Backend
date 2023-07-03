import { Schema, model } from "mongoose";


const BookSchema = new Schema({
    name: {
        type: String,
        trim: true
    }, 
    category: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number, 
        default: 0
    }
},{
    timestamps: true,
    versionKey: false
})

export default model('book', BookSchema)