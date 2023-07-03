import { Router } from "express";
import { calculateWeeklyReport, getWeeklyReport } from "./weeklyR.controller";

const router = Router();

router.get('/weeklyreport', getWeeklyReport)
router.post('/weeklyreport/create', calculateWeeklyReport)

export default router;