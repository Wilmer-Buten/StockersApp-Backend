var ObjectId = require('mongodb').ObjectId;
import Book from "../models/Book";
import books_category from "../models/books_category";

export const getBooks = async (req,res) => {
    const foundBooks = await Book.find();
    const books = foundBooks.map((obj)=>{
        return {
            id: obj._id,
            name: obj.name,
            category: obj.category,
            quantity: obj.quantity
        }
    })
    res.status(200).json(books)
    
}

export const createBooks = async(req, res) =>{
 
    try {
        
       const category = await books_category.findById(req.body.categoryId) 
       const newBook = new Book({
        name: req.body.name,
        category: category.category,
        quantity: req.body.quantity ? req.body.quantity : 0
       })
       await newBook.save(req.body) 
        res.status(200).json(newBook);

       } catch (err) {
            console.log(err)
            res.json('err')
       }
} 

export const deleteBooks = async (req, res) => {

    const data = req.body;
    try {
        data.itemsIds.forEach(async (itemId) => {
            let convertedId = new ObjectId(itemId);
            await Book.deleteOne({_id: convertedId})
        })
        const foundBooks = await Book.find();
        res.status(200).json(foundBooks)
    } catch (err) {
        console.log(err)
    }
}