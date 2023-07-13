import books_category from "../models/books_category";

export const getCategories = async (req,res) => {
    const foundCategories = await books_category.find();
    let categories = foundCategories.map((category)=>{
        return {
            id: category._id,
            category: category.category
        }
    })
    res.status(200).json(categories)
    
}