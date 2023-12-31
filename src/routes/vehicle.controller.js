import CanvassingVehicle from "../models/CanvassingVehicle";
var ObjectId = require('mongodb').ObjectId;


export const getVehicles = async (req,res) => {
    const foundVehicles = await CanvassingVehicle.find();
    res.status(200).json(foundVehicles)
    
}

export const createVehicle = async(req, res) =>{
    try {
        const data = req.body;
        const newUser =  new CanvassingVehicle({vehicle_name: data.name})
        await newUser.save(req.body)
        res.status(200).json(newUser);

       } catch (err) {
            console.error(err)
            res.json('err')
       }
} 

export const saveVehicleBooks = async(req, res) => {
  
    try {
        const data = req.body
        
    const vehicle = await CanvassingVehicle.findById(data.vehicleId, {password: 0})
    
    const vehicleQuantity = data.quantity

    const newEntry = {
            date: req.body.date,
            quantity: vehicleQuantity
        }

    if(data.overwrite){
        const index= vehicle.quantity_per_book.findIndex((obj) => { return Date.parse(obj.date) === Date.parse(data.date)})
       vehicle.quantity_per_book[index] = newEntry 
       const updatedVehicle = await CanvassingVehicle.updateOne({_id: data.vehicleId}, {quantity_per_book: vehicle.quantity_per_book})
       return res.status(200).json('vehiclesBooks saved')

    }

        let vehicleQuantityArr = vehicle.quantity_per_book
        vehicleQuantityArr.push(newEntry)
        const updatedVehicle = await CanvassingVehicle.updateOne({_id: data.vehicleId}, {quantity_per_book: vehicleQuantityArr})

    res.status(200).json('vehiclesBooks saved')
    } catch (err) {
        res.status(401).json(err)
        console.error(err)
    }
}

export const deleteVehicles = async (req, res) => {

    const data = req.body;
    try {
        data.itemsIds.forEach(async (itemId) => {
            let convertedId = new ObjectId(itemId);
            await CanvassingVehicle.deleteOne({_id: convertedId})
        })
        const foundVehicles = await CanvassingVehicle.find()
        res.status(200).json(foundVehicles)
    } catch (err) {
        
    }
}