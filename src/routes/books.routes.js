import {Router} from 'express';
import { createBooks, deleteBooks, getBooks } from './books.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.get('/books', getBooks)
router.post('/books/create', createBooks)
router.post('/books/delete', deleteBooks)


export default router