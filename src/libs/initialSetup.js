import Book from "../models/Book";
import { category } from "./category.enum";
import Books_category from "../models/books_category";
import Role from "../models/Role";
import { roles } from "./roles.enum";

export const createBooks = async () => {
  
    try {
    const count = await Book.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new Book({
        name: "A BETTER WAY OF LIFE",
        category: category.COOK,
      }).save(),
      new Book({
        name: "FIGHTING DESEASE WITH FOOD",
        category: category.HEALTH,
      }).save(),
      new Book({
        name: "HISTORY OF FREEDOM",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "HOPE AND HAPPINESS",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "IN SEARCH OF PEACE ",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "MY FOREVER FRIEND",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "NEW TESTAMENT BIBLE ADVENTURES",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "OLD TESTAMENT BIBLE ADVENTURES",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "POWERFUL PLATE",
        category: category.category.COOK,
      }).save(),
      new Book({ name: "SIMPLY FRESH", category: category.COOK }).save(),
      new Book({
        name: "STORYTIMES ADVENTURES",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "THEY CALL HIM JESUS",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "YOUR QUESTIONS GOD'S ANSWERS",
        category: category.DEVOTIONAL,
      }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createCategories = async () => {
  try {

      const count = await Books_category.estimatedDocumentCount();
      if(count > 0) return;
 
      new Books_category({ category: category.COOK }).save(),
      new Books_category({ category: category.HEALTH }).save(),
      new Books_category({ category: category.DEVOTIONAL }).save();

    } catch (error) {
    console.error(error);
  }
};

export const createRoles = async () => {

  try {
    const count = await Role.estimatedDocumentCount(); 
    if(count > 0) return;

    const values = Promise.all(
      [
        new Role({ role: roles.STUDENT}).save(),
        new Role({ role: roles.STOCKER}).save(), 
        new Role({ role: roles.ADMIN}).save()
      ]
    )
    console.log(values)
  } catch (err) {
    console.error(err)
    
  }
}