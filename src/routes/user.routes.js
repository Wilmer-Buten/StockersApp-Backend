import Router from 'express';
import { editUserBooks, getUserBooks, saveUserBooks, signUp, signIn, getUsers } from './user.controller';


const router = Router();
router.post('/user/signUp', signUp)
router.post('/user/login', signIn)
// router.get('/user/books', getUserBooks)
router.get('/users', getUsers)
router.post('/user/savebooks', saveUserBooks)
router.put('/user/books/:id',editUserBooks)

export default router;