import {Router} from 'express';

const router = Router();

router.get('/books', (req, res) => {
    res.send('HELLLOOOO')
})

export default router