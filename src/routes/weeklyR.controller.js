import mongoose from "mongoose";
import Book from "../models/Book";
import User from "../models/User";
import CanvassingVehicle from "../models/CanvassingVehicle";
import StockerRoom from "../models/StockerRoom";
import WeeklyReport from "../models/WeeklyReport";

export const getWeeklyReport = async (req, res) => {
  try {

    const foundWeeklyReports = await WeeklyReport.find();
    res.status(200).json(foundWeeklyReports);
  } catch (err) {
    console.error(err);
    res.status(401).json(err);
  }
};

export const calculateWeeklyReport = async (req, res) => {
 
  const data = req.body;
  const calculateStudentBooks = async () => {
    try {
      const foundUsers = await User.find();
      let newReport = [];
      foundUsers.forEach((user) => {
        user.quantity_per_book.forEach((userQuantityPerBookObj) => {
          userQuantityPerBookObj.quantity.forEach((userQuantityObj) => {
            if (
              newReport.find((obj) => {
                return obj.bookId === userQuantityObj.bookId;
              })
            ) {
              const index = newReport.findIndex((obj) => {
                return obj.bookId === userQuantityObj.bookId;
              });
              newReport[index].quantity = JSON.stringify(
                Number(newReport[index].quantity) +
                  Number(userQuantityObj.quantity)
              );
            } else {
              newReport.push(userQuantityObj);
            }
          });
        });
      });
      return newReport;
    } catch (err) {
      console.error(err);
    }
  };
  const calculateVehicleBooks = async () => {
    try {
      const foundVehicles = await CanvassingVehicle.find();
      let newReport = [];
      foundVehicles.forEach((vehicle) => {
        vehicle.quantity_per_book.forEach((vehicleQuantityPerBookObj) => {
          if(vehicleQuantityPerBookObj.date === data.date){
          vehicleQuantityPerBookObj.quantity.forEach((vehicleQuantityObj) => {
            if (
              newReport.find((obj) => {
                return obj.bookId === vehicleQuantityObj.bookId;
              })
            ) {
              const index = newReport.findIndex((obj) => {
                return obj.bookId === vehicleQuantityObj.bookId;
              });
              newReport[index].quantity = JSON.stringify(
                Number(newReport[index].quantity) +
                  Number(vehicleQuantityObj.quantity)
              );
            } else {
              newReport.push(vehicleQuantityObj);
            }
          });
        }
        });
      });
      return newReport;
    } catch (err) {
      console.error(err);
    }

  };
  const calculateRoomBooks = async () => {
    try {
      const foundRooms = await StockerRoom.find();
      let newReport = [];
      foundRooms.forEach((room) => {
        room.quantity_per_book.forEach((roomQuantityPerBookObj) => {
         if(roomQuantityPerBookObj.date === data.date){
          roomQuantityPerBookObj.quantity.forEach((roomQuantityObj) => {
            if (
              newReport.find((obj) => {
                return obj.bookId === roomQuantityObj.bookId;
              })
            ) {
              const index = newReport.findIndex((obj) => {
                return obj.bookId === roomQuantityObj.bookId;
              });
              newReport[index].quantity = JSON.stringify(
                Number(newReport[index].quantity) +
                  Number(roomQuantityObj.quantity)
              );
            } else {
              newReport.push(roomQuantityObj);
            }
          });
        }
        });
      });
      return newReport;
    } catch (err) {
      console.error(err);
    }
  };

  let booksInBags = await calculateStudentBooks();
  let booksInVehicles = await calculateVehicleBooks();
  let booksInRooms = await calculateRoomBooks();

  const calculateTotalPerPlace = (booksArr, mjs) => {
    let total = 0;
    booksArr.forEach((booksObj) => {
      total = total + Number(booksObj.quantity);
    });
    return total;
  };
  const calculateTotalPerBook = (
    booksInBags,
    booksInVehicles,
    booksInRooms
  ) => {
    let newBooksQuantity = [];
    booksInBags.forEach((book) => {
      let index = newBooksQuantity.findIndex((obj) => {
        return obj.bookId === book.bookId;
      });
      if (index > -1) {
        newBooksQuantity[index].quantity = Number(newBooksQuantity[index].quantity) + Number(book.quantity);
      } else {
        newBooksQuantity.push(book);
      }

    });
    booksInVehicles.forEach((book) => {
      let i = newBooksQuantity.findIndex((obj) => {
        return obj.bookId === book.bookId;
      });
      if (i > -1) {
        newBooksQuantity[i].quantity =
          Number(newBooksQuantity[i].quantity) + Number(book.quantity);
      } else {
        newBooksQuantity.push(book);
      }
    });
    booksInRooms.forEach((book) => {
      let roomIndex = newBooksQuantity.findIndex((obj) => {
        return obj.bookId === book.bookId;
      });
      if (roomIndex > -1) {
        newBooksQuantity[roomIndex].quantity = Number(newBooksQuantity[roomIndex].quantity) + Number(book.quantity);
      } else {
        newBooksQuantity.push(book);
      }
    });
    return newBooksQuantity;
  };

  const calculateTotal = (booksInBags, booksInVehicles, booksInRooms) => {
    let total = 0;
    total = booksInBags.total + booksInVehicles.total + booksInRooms.total;
    return total;
  };

  const finalReportWithoutTotal = {
    date: data.date,
    booksInBags: {
      quantity_per_book: booksInBags,
      total: calculateTotalPerPlace(booksInBags, "as"),
    },
    booksInVehicles: {
      quantity_per_book: booksInVehicles,
      total: calculateTotalPerPlace(booksInVehicles),
    },
    booksInRooms: {
      quantity_per_book: booksInRooms,
      total: calculateTotalPerPlace(booksInRooms),
    },
  };

  const finalReport = {
    date: data.date,
    books_in_bags_quantity: finalReportWithoutTotal.booksInBags,
    books_in_vehicles_quantity: finalReportWithoutTotal.booksInVehicles,
    books_in_rooms_quantity: finalReportWithoutTotal.booksInRooms,
    total_books: calculateTotal(
      finalReportWithoutTotal.booksInBags,
      finalReportWithoutTotal.booksInVehicles,
      finalReportWithoutTotal.booksInRooms
    ),
  };
  
  const newReport = new WeeklyReport(finalReport);
  
  if (data.overwrite) {
    const foundWeeklyReports = await WeeklyReport.find();

    const index = foundWeeklyReports.findIndex((obj) => {
      return Date.parse(obj.date) === Date.parse(data.date);
    });
    const weeklyReportId = foundWeeklyReports[index]._id;
    foundWeeklyReports[index] = finalReport;
    const updatedWeeklyReport = await WeeklyReport.updateOne(
      { _id: weeklyReportId },
      {
        date: finalReport.date,
        books_in_bags_quantity: finalReport.books_in_bags_quantity,
        books_in_vehicles_quantity: finalReport.books_in_vehicles_quantity,
        books_in_rooms_quantity: finalReport.books_in_rooms_quantity,
        total_books: finalReport.total_books,
      }
      );
  } else{
    newReport.save()
  }
  const updateBooks = async () => {
   
    const totalBooks = calculateTotalPerBook(
      booksInBags,
      booksInVehicles,
      booksInRooms
    );
    totalBooks.forEach(async (book) => {
      await Book.updateOne({ _id: book.bookId }, { quantity: book.quantity });
    });
  };
  await updateBooks()

  res.status(200).json(finalReport);
};
