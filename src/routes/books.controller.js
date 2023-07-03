import Book from "../models/Book";
import User from "../models/User"

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