import {Router} from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { getCategories } from './category.controller';

const router = Router();

router.get('/categories', getCategories)

export default router