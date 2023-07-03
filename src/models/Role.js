import {model, Schema} from 'mongoose'

const roleSchema = new Schema({
    
    role: String
    
},{
    timestamps: true,
    versionKey: false
})

export default model('Role', roleSchema);