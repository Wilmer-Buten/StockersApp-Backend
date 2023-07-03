import {Router} from 'express';
import { getBooks } from './books.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.get('/books', getBooks)

export default router