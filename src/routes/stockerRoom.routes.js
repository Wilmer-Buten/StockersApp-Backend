import {Router} from 'express';
import { createRooms, deleteRooms, getRooms, saveRoomBooks } from './stockerRoom.controller';

const router = Router();

router.get('/stockerrooms', getRooms)
router.post('/stockerrooms/create', createRooms)
router.post('/stockerrooms/saveBooks', saveRoomBooks)
router.post('/stockerrooms/delete', deleteRooms)

export default router