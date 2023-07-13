import Book from "../models/Book";
import { category } from "./category.enum";
import Books_category from "../models/books_category";
import Role from "../models/Role";
import { roles } from "./roles.enum";
import StockerRoom from "../models/StockerRoom";
import CanvassingVehicle from "../models/CanvassingVehicle";

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
        category: category.COOK,
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
      new Book({
        name: "THE PARABOLES",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "SIMPLY FRESH",
        category: category.COOK,
      }).save(),
      new Book({
        name: "SP - A BETTER WAY OF LIFE",
        category: category.COOK,
      }).save(),
      new Book({
        name: "SP - FIGHTING DESEASE WITH FOOD",
        category: category.HEALTH,
      }).save(),
      new Book({
        name: "SP - HISTORY OF FREEDOM",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "SP - HOPE AND HAPPINESS",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "SP - IN SEARCH OF PEACE ",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "SP - MY FOREVER FRIEND",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "SP - NEW TESTAMENT BIBLE ADVENTURES",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "SP - YOUR QUESTIONS GOD'S ANSWERS",
        category: category.DEVOTIONAL,
      }).save(),
      new Book({
        name: "SP - THEY CALL HIM JESUS",
        category: category.DEVOTIONAL,
      }).save()
    ]);
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
  } catch (err) {
    console.error(err)   
  }
}

export const createVehicles = async () => {

  try {
    const count = await CanvassingVehicle.estimatedDocumentCount(); 
    if(count > 0) return;
    const values = Promise.all(
      [
        new CanvassingVehicle(
          {
            vehicle_name: "Van de Andres", 
            photo: "asasa", 
            quantity_per_book: [ 
          ]
          }).save(),
          new CanvassingVehicle(
            {
              vehicle_name: "Van de Valeria", 
              photo: " ", 
              quantity_per_book: [ 
            ]
            }).save(),
            new CanvassingVehicle(
              {
                vehicle_name: "Van de Olga", 
                photo: " ", 
                quantity_per_book: [ 
              ]
              }).save(),
              new CanvassingVehicle(
                {
                  vehicle_name: "Van de Kevin", 
                  photo: " ", 
                  quantity_per_book: [ 
                ]
                }).save()
      ]
    )
  } catch (err) {
    console.error(err)   
  }
}

export const createRooms = async () => {

  try {
    const count = await StockerRoom.estimatedDocumentCount(); 
    if(count > 0) return;

    const values = Promise.all(
      [
        new StockerRoom(
          {
            room_name: "Stocker room 1", 
            photo: "asasa", 
            quantity_per_book: [ 
          ]
          }).save()
      ]
    )
  } catch (err) {
    console.error(err)   
  }
}