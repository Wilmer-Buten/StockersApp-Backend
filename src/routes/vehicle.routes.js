import {Router} from 'express';
import { createVehicle, getVehicles, saveVehicleBooks } from './vehicle.controller';

const router = Router();

router.get('/vehicles', getVehicles)
router.post('/vehicles/create', createVehicle)
router.post('/vehicles/saveBooks', saveVehicleBooks)
export default router