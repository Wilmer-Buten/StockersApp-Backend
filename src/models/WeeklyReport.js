import {model, Schema} from 'mongoose'


const reportSchema = new Schema({

    date: {
        type: String,
        trim: true
    }, 
    books_in_bags_quantity: {},
    books_in_vehicles_quantity: {},
    books_in_rooms_quantity: {},
    total_books: Number,
}, {
    timestamps: true,
    versionKey: false
})

export default model('WeeklyReport', reportSchema)

