import mongoose from 'mongoose'; 

(async () => {
const db = await mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`)
console.log('database is connected to:', db.connection.name)
})()