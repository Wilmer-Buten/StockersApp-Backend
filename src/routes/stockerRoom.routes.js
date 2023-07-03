import {Router} from 'express';
import { createRooms, getRooms, saveRoomBooks } from './stockerRoom.controller';

const router = Router();

router.get('/stockerrooms', getRooms)
router.post('/stockerrooms/create', createRooms)
router.post('/stockerrooms/saveBooks', saveRoomBooks)

export default router