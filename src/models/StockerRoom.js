import {model, Schema} from 'mongoose';

const stockerRoomSchema = new Schema({

    room_name: {
        type: String,
        trim: true
    }, 
    photo: {
        type: String,
        trim: true
    },  
    quantity_per_book: [{
        date: String,
        quantity: [ ]
       }, ]
}, {
    timestamps: true,
    versionKey: false
})

export default model('StockerRoom', stockerRoomSchema)