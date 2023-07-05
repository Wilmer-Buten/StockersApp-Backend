import User from "../models/User"
import jwt from 'jsonwebtoken'
import config from '../config'

export const signUp = async (req,res) => {

   try {
    const foundUser = await User.find({email: req.body.email})
    if(foundUser.length > 0){
        return res.status(403).json('User already existed')
    }
    const newUser =  new User(req.body)
    const savedUser = await newUser.save(req.body)
    res.status(200).json(1);
   } catch (err) {
        console.log(err)
        res.json('err')
   }
}

export const signIn = async (req, res) => {
  
    try {
        const foundUser = await User.find({
            email: req.body.email,
            password: req.body.password            
        })
        if(foundUser.length === 0){
            return res.status(403).json('User not found')
        }
        console.log(foundUser)
        const token = jwt.sign({id: foundUser[0]._id, name: foundUser[0].name, role: foundUser[0].role}, config.SECRET)
        console.log(jwt.decode(token) )
        res.status(200).json({
            userId: foundUser[0]._id,
            token: token
        });
    } catch (err) {
        console.log(err)
        res.json('err')
    }
}


export const getUsers = async (req,res) => {
    const foundUsers = await User.find(); 
    const users = foundUsers.map((user) =>{
        return {
            userId: user._id, 
            name: user.username,
            quantity_per_book: user.quantity_per_book
        }
    })
    console.log(users)
    res.status(200).json(users)
}

export const saveUserBooks = async(req,res )=> {
  
    try {
        const data = req.body
        console.log(data)        

    const newQuantityPerBook = []    
        
    const user = await User.findById(data.userId, {password: 0})
    
    const userQuantity = data.quantity

    const newEntry = {
            date: req.body.date,
            quantity: userQuantity
        }

    if(data.overwrite){
        const index= user.quantity_per_book.findIndex((obj) => { return Date.parse(obj.date) === Date.parse(data.date)})
        console.log(index)
       user.quantity_per_book[index] = newEntry 
       const updatedUser = await User.updateOne({_id: data.userId}, {quantity_per_book: user.quantity_per_book})
       console.log(updatedUser) 
       return res.status(200).json('StudentBooks saved')

    }

        let userQuantityArr = user.quantity_per_book
        userQuantityArr.push(newEntry)
        const updatedUser = await User.updateOne({_id: data.userId}, {quantity_per_book: userQuantityArr})
        console.log(updatedUser)

    res.status(200).json('userBooks saved')
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
  
    // try {
    //     const token = req.headers['x-access-token']
    //     const decoded = jwt.decode(token)
        

    // const user = await User.findById(decoded.id, {password: 0})
    // const userQuantity = req.body.quantity

    // const newEntry = {
    //         date: req.body.date,
    //         quantity: userQuantity
    //     }
    //     console.log(userQuantity)
    // const updatedUser = await User.updateOne({_id: decoded.id}, {quantity_per_book: newEntry})
    //     console.log(updatedUser)

    // res.status(200).json('books saved')
    // } catch (err) {
    //     console.log(err)
    // }
}


export const editUserBooks = (req,res )=> {
    const index = req.params.id
    console.log(index)
    res.json(`Libro ${index} saved`)
}