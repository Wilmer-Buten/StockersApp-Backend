require("dotenv").config();
import express from 'express';
import booksRoutes from './routes/books.routes' 
import userRoutes from './routes/user.routes';
import weeklyReportRoutes from './routes/weeklyR.routes';
import vehicleRoutes from './routes/vehicle.routes'
import roomsRoutes from './routes/stockerRoom.routes'

import morgan from 'morgan';
import cors from 'cors';
import { createBooks, createCategories } from './libs/initialSetup';

const app = express();

createBooks();
createCategories();

app.use(cors(
   
));
app.set('port', process.env.PORT || 4000)
app.use(morgan('dev'))
app.use(express.json());
app.use(booksRoutes)
app.use(userRoutes)
app.use(weeklyReportRoutes)
app.use(vehicleRoutes)
app.use(roomsRoutes)
app.use(express.urlencoded({extended: false}))

export default app;