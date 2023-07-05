import StockerRoom from "../models/StockerRoom";



export const getRooms = async (req,res) => {
    const foundRooms = await StockerRoom.find();
    res.status(200).json(foundRooms)
    
}

export const createRooms = async(req, res) =>{
    try {
  
        const newRoom =  new StockerRoom(req.body)
        const savedRoom = await newRoom.save(req.body)
        res.status(200).json(1);

       } catch (err) {
            console.log(err)
            res.json('err')
       }
} 

export const saveRoomBooks = async(req, res) => {
  
    try {
        const data = req.body

    const newQuantityPerBook = []    
        
    const room = await StockerRoom.findById(data.roomId, {password: 0})
    
    const roomQuantity = data.quantity

    const newEntry = {
            date: req.body.date,
            quantity: roomQuantity
        }

    if(data.overwrite){
        const index= room.quantity_per_book.findIndex((obj) => { return Date.parse(obj.date) === Date.parse(data.date)})
       room.quantity_per_book[index] = newEntry 
       const updatedRoom = await StockerRoom.updateOne({_id: data.roomId}, {quantity_per_book: room.quantity_per_book})
       return res.status(200).json('vehiclesBooks saved')

    }

        let roomQuantityArr = room.quantity_per_book
        roomQuantityArr.push(newEntry)
        const updatedRoom = await StockerRoom.updateOne({_id: data.roomId}, {quantity_per_book: roomQuantityArr})

    res.status(200).json('StockerRoomBooks saved')
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}