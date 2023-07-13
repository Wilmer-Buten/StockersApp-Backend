import {Router} from 'express';
import { createVehicle, deleteVehicles, getVehicles, saveVehicleBooks } from './vehicle.controller';
import { deleteBooks } from './books.controller';

const router = Router();

router.get('/vehicles', getVehicles)
router.post('/vehicles/create', createVehicle)
router.post('/vehicles/saveBooks', saveVehicleBooks)
router.post('/vehicles/delete', deleteVehicles)
export default router;