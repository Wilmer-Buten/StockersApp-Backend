import CanvassingVehicle from "../models/CanvassingVehicle";

export const getVehicles = async (req,res) => {
    const foundVehicles = await CanvassingVehicle.find();
    console.log(foundVehicles)
    res.status(200).json(foundVehicles)
    
}

export const createVehicle = async(req, res) =>{
    try {
  
        const newUser =  new CanvassingVehicle(req.body)
        const savedVehicle = await newUser.save(req.body)
        console.log(savedVehicle)
        res.status(200).json(1);

       } catch (err) {
            console.log(err)
            res.json('err')
       }
} 

export const saveVehicleBooks = async(req, res) => {
  
    try {
        const data = req.body
        console.log(data)        

    const newQuantityPerBook = []    
        
    const vehicle = await CanvassingVehicle.findById(data.vehicleId, {password: 0})
    
    const vehicleQuantity = data.quantity

    const newEntry = {
            date: req.body.date,
            quantity: vehicleQuantity
        }

    if(data.overwrite){
        const index= vehicle.quantity_per_book.findIndex((obj) => { return Date.parse(obj.date) === Date.parse(data.date)})
        console.log(index)
       vehicle.quantity_per_book[index] = newEntry 
       const updatedVehicle = await CanvassingVehicle.updateOne({_id: data.vehicleId}, {quantity_per_book: vehicle.quantity_per_book})
       console.log(updatedVehicle) 
       return res.status(200).json('vehiclesBooks saved')

    }

        let vehicleQuantityArr = vehicle.quantity_per_book
        vehicleQuantityArr.push(newEntry)
        const updatedVehicle = await CanvassingVehicle.updateOne({_id: data.vehicleId}, {quantity_per_book: vehicleQuantityArr})
        console.log(updatedVehicle)

    res.status(200).json('vehiclesBooks saved')
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}